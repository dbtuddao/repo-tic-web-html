import { LOAD_SUCCESS as REMOVE_SUCCESS } from './advertiseRemove';

export const LOAD = 'tix/advertiseListAllByUser/LOAD';
export const LOAD_SUCCESS = 'tix/advertiseListAllByUser/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/advertiseListAllByUser/LOAD_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  let newstate = {};
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
        error: null,
        data: action.payload
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REMOVE_SUCCESS:
      newstate = {
        ...state
      };

      if (newstate.data) {
        for (let i = 0; i < newstate.data.advertises.length; i++) {
          if (newstate.data.advertises[i].id === action.meta.id) {
            newstate.data.advertises.splice(i, 1);
            break;
          }
        }
      }

      return newstate;
    default:
      return state;
  }
}

export function listByUser(authToken, search, filter, limit, offset) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/EventAds/GetAllByUser', {
      auth: authToken,
      data: {
        search: search,
        filter: filter,
        limit,
        offset
      }
    })
  };
}
