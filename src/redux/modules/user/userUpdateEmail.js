export const LOAD = 'tix/userUpdateEmail/LOAD';
export const LOAD_SUCCESS = 'tix/userUpdateEmail/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/userUpdateEmail/LOAD_FAIL';

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

export function updateEmail(verifyToken) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/User/UpdateEmail', {
      data: { verifyToken }
    })
  };
}
