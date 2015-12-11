export const SET_SEARCH = 'tix/paymentFilter/SET_SEARCH';
export const SET_FILTER = 'tix/paymentFilter/SET_FILTER';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
}

export function setSearch(search) {
  return {
    type: SET_SEARCH,
    payload: search
  };
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
}
