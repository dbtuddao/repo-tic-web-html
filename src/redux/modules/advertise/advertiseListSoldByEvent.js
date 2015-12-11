export const LOAD = 'tix/advertiseListSoldByEvent/LOAD';
export const LOAD_SUCCESS = 'tix/advertiseListSoldByEvent/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/advertiseListSoldByEvent/LOAD_FAIL';

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
    default:
      return state;
  }
}

export function listSoldByEvent(eventID, limit, offset) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/EventAds/GetAllSoldByEventID', {
      data: {
        eventID,
        limit,
        offset
      }
    })
  };
}

export function listSoldByTicketType(ticketTypeID, limit, offset) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/EventAds/GetAllSoldByTicketTypeID', {
      data: {
        ticketTypeID,
        limit,
        offset
      }
    })
  };
}

