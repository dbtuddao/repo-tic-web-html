import { createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from 'redux/middleware/clientMiddleware';
import createLogger from 'redux-logger';

export default function createApiClientStore(client, data) {
  let finalCreateStore;
  const middlewares = [
    createMiddleware(client)
  ];

  if (__DEVELOPMENT__ && __CLIENT__) {
    middlewares.push(createLogger());
    if (__DEVTOOLS__) {
      const { devTools, persistState } = require('redux-devtools');
      finalCreateStore = compose(
        applyMiddleware(...middlewares),
        devTools(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      )(createStore);
    } else {
      finalCreateStore = compose(applyMiddleware(...middlewares))(createStore);
    }
  } else {
    finalCreateStore = compose(applyMiddleware(...middlewares))(createStore);
  }

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);
  store.client = client;

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
