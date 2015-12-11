export const SAVE = 'tix/advertiseUpdate/SAVE';
export const SAVE_SUCCESS = 'tix/advertiseUpdate/SAVE_SUCCESS';
export const SAVE_FAIL = 'tix/advertiseUpdate/SAVE_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        loading: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true
      };
    case SAVE_FAIL:
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
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/EventAds/UpdateByOwner', {
      auth: authToken,
      data: { id, ...data }
    })
  };
}

