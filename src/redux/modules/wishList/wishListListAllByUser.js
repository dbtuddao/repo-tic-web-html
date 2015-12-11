import { LOAD_SUCCESS as ACTIVATE_SUCCESS } from './wishListActivate';
import { LOAD_SUCCESS as DEACTIVATE_SUCCESS } from './wishListDeActivate';

export const LOAD = 'tix/wishListListAllByUser/LOAD';
export const LOAD_SUCCESS = 'tix/wishListListAllByUser/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/wishListListAllByUser/LOAD_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  let newState = {};
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
    case ACTIVATE_SUCCESS:
      newState = {
        ...state
      };

      for (let i = 0; i < newState.data.wishLists.length; i++) {
        if (newState.data.wishLists[i].id === action.meta.id) {
          state.data.wishLists[i].active = true;
        }
      }

      return newState;
    case DEACTIVATE_SUCCESS:
      newState = {
        ...state
      };

      for (let i = 0; i < newState.data.wishLists.length; i++) {
        if (newState.data.wishLists[i].id === action.meta.id) {
          state.data.wishLists[i].active = false;
        }
      }

      return newState;
    default:
      return state;
  }
}

export function listAllByUser(authToken, limit, offset) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/WishList/GetAllByUser', {
      auth: authToken,
      data: {
        limit,
        offset
      }
    })
  };
}
