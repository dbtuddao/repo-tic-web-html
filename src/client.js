require('jquery');
require('../vendor/css/bootstrap.min.css');
/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel/polyfill';
import React from 'react';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Location from 'react-router/lib/Location';
import queryString from 'query-string';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import universalRouter from './helpers/universalRouter';
const history = new BrowserHistory();
const client = new ApiClient();

const dest = document.getElementById('react-app');
const store = createStore(client, window.__data);
const search = document.location.search;
const query = search && queryString.parse(search);
const location = new Location(document.location.pathname, query);
universalRouter(location, history, store)
  .then(({component}) => {
    if (!__DEVTOOLS__) {
      React.render(component, dest);
    } else {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      React.render(<div>
        {component}
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={store} monitor={LogMonitor}/>
        </DebugPanel>
      </div>, dest);
    }
  }, (error) => {
    console.error(error);
  });


if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
  const reactRoot = window.document.getElementById('react-app');

  if (!reactRoot || !reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}
