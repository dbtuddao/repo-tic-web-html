import { LOAD_SUCCESS as REMOVE_SUCCESS } from './userAddressRemove';

export const LOAD = 'tix/userAddressGetAll/LOAD';
export const LOAD_SUCCESS = 'tix/userAddressGetAll/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/userAddressGetAll/LOAD_FAIL';

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
    case REMOVE_SUCCESS:
      newstate = {
        ...state
      };

      if (newstate.data) {
        for (let i = 0; i < newstate.data.userAddresses.length; i++) {
          if (newstate.data.userAddresses[i].id === action.meta.id) {
            newstate.data.userAddresses.splice(i, 1);
            break;
          }
        }
      }

      return newstate;
    default:
      return state;
  }
}

export function getAll(authToken, limit, offset) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/UserAddress/GetAllByUser', {
      auth: authToken,
      data: { limit, offset }
    })
  };
}
