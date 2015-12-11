export const LOAD = 'tix/wishListActivate/LOAD';
export const LOAD_SUCCESS = 'tix/wishListActivate/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/wishListActivate/LOAD_FAIL';

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
        loading: false,
        loaded: true,
        error: null
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

export function activate(authToken, id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/WishList/Activate', {
      auth: authToken,
      data: {
        id
      }
    }),
    meta: { id }
  };
}
