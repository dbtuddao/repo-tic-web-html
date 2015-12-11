import { UPSERT_SUCCESS } from './paymentMethodUpsertPaypal';
export const LOAD = 'tix/paymentMethodPaypal/LOAD';
export const LOAD_SUCCESS = 'tix/paymentMethodPaypal/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/paymentMethodPaypal/LOAD_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        data: action.payload
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case UPSERT_SUCCESS:
      return {
        ...state,
        data: {
          email: action.meta.email
        }
      };
    default:
      return state;
  }
}

export function getPaypal(authToken) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/PaymentMethod/GetByUser', {
      auth: authToken,
      data: { method: 'paypal'}
    })
  };
}
