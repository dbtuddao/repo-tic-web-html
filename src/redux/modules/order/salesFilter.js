export const SET_SEARCH = 'tix/salesFilter/SET_SEARCH';
export const SET_FILTER = 'tix/salesFilter/SET_FILTER';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload.search,
        dateFrom: action.payload.dateFrom,
        dateTo: action.payload.dateTo
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

export function setSalesSearch(search, dateFrom, dateTo) {
  return {
    type: SET_SEARCH,
    payload: {
      search,
      dateFrom,
      dateTo
    }
  };
}

export function setSalesFilter(filter) {
  return {
    type: SET_FILTER,
    payload: filter
  };
}
