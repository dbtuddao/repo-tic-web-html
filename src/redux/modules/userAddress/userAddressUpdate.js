export const LOAD = 'tix/userAddressUpdate/LOAD';
export const LOAD_SUCCESS = 'tix/userAddressUpdate/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/userAddressUpdate/LOAD_FAIL';

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
        loaded: true
      };
    case LOAD_FAIL:
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

export function update(authToken, id, data) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/UserAddress/UpdateByUser', {
      auth: authToken,
      data: { id, ...data }
    })
  };
}
