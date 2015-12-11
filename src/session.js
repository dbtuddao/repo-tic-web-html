import config from './config';
import superagent from 'superagent';
import jsonBody from 'body/json';

export function getSession(req, res) {
  res.json(req.session.data || null);
}

export function cart(req, res) {
  jsonBody(req, res, (err, body)=>{
    if (err) {
      res.status(500).send({status: 500, message: err});
      return;
    }

    req.session.data.cart = body;
    res.json(req.session.data.cart);
  });
}

export function sellTicket(req, res) {
  jsonBody(req, res, (err, body)=>{
    if (err) {
      res.status(500).send({status: 500, message: err});
      return;
    }

    req.session.data.sellTicket = body || null;
    res.json(req.session.data.sellTicket);
  });
}

export function login(req, res) {
  jsonBody(req, res, (err, body)=>{
    if (err) {
      res.status(500).send({status: 500, message: err});
      return;
    }
    superagent.post(`${config.apiURL}/Auth/LoginFb`).send(body).set('Content-Type', 'application/json').end((errRes, apiRes) => {
      if (errRes) {
        const errData = apiRes.body || errRes;
        if (typeof errData === 'object') {
          res.status(apiRes.status).send({status: apiRes.status, ...errData});
        } else {
          res.status(apiRes.status).send({status: apiRes.status, message: errData});
        }
      } else {
        req.session.data = apiRes.body;
        res.json(req.session.data || null);
      }
    });
  });
}

export function logout(req, res) {
  req.session.destroy(() => {
    req.session = null;
    res.json(null);
  });
}
