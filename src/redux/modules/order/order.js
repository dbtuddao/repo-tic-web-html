export const ORDER = 'tix/order/ORDER';
export const ORDER_SUCCESS = 'tix/order/ORDER_SUCCESS';
export const ORDER_FAIL = 'tix/order/ORDER_FAIL';
export const INIT = 'tix/order/INIT';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ORDER:
      return {
        ...state,
        loading: true
      };
    case ORDER_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        data: action.meta
      };
    case ORDER_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case INIT:
      return initialState;
    default:
      return state;
  }
}

export function init() {
  return {
    type: INIT
  };
}

export function order(authToken, advertiseID, amount, qty, currency, authorizationToken) {
  return {
    types: [ORDER, ORDER_SUCCESS, ORDER_FAIL],
    promise: (client) => client.post('/Order/Create', {
      auth: authToken,
      data: {
        advertiseID,
        amount,
        qty,
        currency,
        authorizationToken
      }
    })
  };
}
