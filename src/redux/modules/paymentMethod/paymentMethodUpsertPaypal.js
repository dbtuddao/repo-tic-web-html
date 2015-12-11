export const UPSERT = 'tix/paymentMethodUpsertPaypal/UPSERT';
export const UPSERT_SUCCESS = 'tix/paymentMethodUpsertPaypal/UPSERT_SUCCESS';
export const UPSERT_FAIL = 'tix/paymentMethodUpsertPaypal/UPSERT_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPSERT:
      return {
        ...state,
        loading: true
      };
    case UPSERT_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true
      };
    case UPSERT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function upsert(authToken, email) {
  return {
    types: [UPSERT, UPSERT_SUCCESS, UPSERT_FAIL],
    promise: (client) => client.post('/PaymentMethod/UpsertPaypal', {
      auth: authToken,
      data: { email }
    }),
    meta: { email }
  };
}

