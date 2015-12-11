export const LOAD = 'tix/fbEventName/LOAD';
export const LOAD_SUCCESS = 'tix/fbEventName/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/fbEventName/LOAD_FAIL';

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
    default:
      return state;
  }
}

export function getEventName(fbEventID) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/Facebook/GetEventName', {data: {id: fbEventID}})
  };
}
