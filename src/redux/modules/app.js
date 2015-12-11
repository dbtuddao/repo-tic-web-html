const SERVER_FETCH_DISABLE = 'tix/app/SERVER_FETCH_DISABLE';
const SERVER_FETCH_ENABLE = 'tix/app/SERVER_FETCH_ENABLE';

const initialState = {
  serverFetch: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SERVER_FETCH_ENABLE:
      return {
        ...state,
        serverFetch: true
      };
    case SERVER_FETCH_DISABLE:
      return {
        ...state,
        serverFetch: false
      };
    default:
      return state;
  }
}

export function enableServerFetch() {
  return {
    type: SERVER_FETCH_ENABLE
  };
}

export function disableServerFetch() {
  return {
    type: SERVER_FETCH_DISABLE
  };
}

export function isLoaded(state) {
  return state && state.isLoaded;
}

export function reFetch(store) {
  if (!__CLIENT__) {
    store.dispatch(enableServerFetch());
    return true;
  }

  const state = store.getState();
  if (!state.app.serverFetch) {
    return true;
  }

  if (__CLIENT__) {
    store.dispatch(disableServerFetch());
  }

  return false;
}
