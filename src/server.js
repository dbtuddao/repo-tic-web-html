import Express from 'express';
import React from 'react';
import Location from 'react-router/lib/Location';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import bodyParser from 'body-parser';
// session
import Sequelize from 'sequelize';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectSession from 'connect-session-sequelize';

const SequelizeStore = connectSession(session.Store);
const sequelize = new Sequelize('tix2', 'root', 'power2edit', {
  host: process.env.TIX_MYSQL_HOST || '192.168.99.100',
  port: 3306,
  dialect: 'mysql',
  logging: false
});
const store = new SequelizeStore({
    db: sequelize
});

store.sync();

const pretty = new PrettyError();
const app = new Express();
const proxy = httpProxy.createProxyServer({
  target: config.apiURL
});

app.use(cookieParser());
app.use(session({
  secret: 'tix !@##%#$% !!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 259200000 },
  store: store,
  name: 'ticketlister'
}));
app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(require('serve-static')(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/_api', (req, res) => {
  if (req.session.data && req.session.data.auth) {
    req.headers['Authorization'] = req.session.data.auth.token;
  }

  proxy.web(req, res);
});

app.use(bodyParser.json());
app.get('/_session', (req, res) => {
  res.json(req.session.data || null);
});

app.get('/Download/*', (req, res) => {
  if (req.session.data && req.session.data.auth) {
    req.headers['Authorization'] = req.session.data.auth.token;
  }

  proxy.web(req, res);
});

app.post('/_session/:name', (req, res) => {
  if (!req.session.data) {
    req.session.data = {};
  }

  req.session.data[req.params.name] = req.body || null;
  res.json(req.session.data[req.param.name]);
});

app.delete('/_session', (req, res) => {
  req.session.destroy();
  res.json(null);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  console.log('proxy error', error);
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const store = createStore(client);
  const location = new Location(req.path, req.query);

  if (req.session.data) {
    store.dispatch({
      type: 'tix/session/INIT',
      payload: req.session.data
    });
  }

  const hydrateOnClient = () => {
    res.send('<!doctype html>\n' +
      React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<div/>} store={store}/>));
  };

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  universalRouter(location, undefined, store)
    .then(({component, transition, isRedirect}) => {
      if (isRedirect) {
        res.redirect(transition.redirectInfo.pathname);
        return;
      }
      res.send('<!doctype html>\n' +
        React.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
    })
    .catch((error) => {
      if (error.redirect) {
        res.redirect(error.redirect);
        return;
      }
      console.error('ROUTER ERROR:', pretty.render(error));
      hydrateOnClient(); // let client render error page or re-request data
    });
});

if (config.port) {
  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  Server is running, talking to API server on %s.', config.apiURL);
    console.info('==> 💻  Open http://localhost:%s in a browser to view the app.', config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
