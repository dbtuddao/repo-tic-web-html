import moment from 'moment';

export const LOAD = 'tix/eventListRangeDate/LOAD';
export const LOAD_SUCCESS = 'tix/eventListRangeDate/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/eventListRangeDate/LOAD_FAIL';

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
        data: action.payload,
        eventType: action.meta.eventType
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

export function listToday(limit, offset) {
  const startDate = moment().utc().format();
  const toDate = moment().utc().endOf('day').format();
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    meta: {
      eventType: 'today'
    },
    promise: (client) => client.post('/Event/GetActiveByRangeFromDate', {
      data: {
        dateStart: startDate,
        dateEnd: toDate,
        limit: limit,
        offset: offset
      }
    })
  };
}

export function listTomorrow(limit, offset) {
  const startDate = moment().utc().add(1, 'days').startOf('day').format();
  const toDate = moment().utc().add(1, 'days').endOf('day').format();

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    meta: {
      eventType: 'tomorrow'
    },
    promise: (client) => client.post('/Event/GetActiveByRangeFromDate', {
      data: {
        dateStart: startDate,
        dateEnd: toDate,
        limit: limit,
        offset: offset
      }
    })
  };
}

export function listThisWeekend(limit, offset) {
  const startDate = moment().utc().endOf('week').startOf('day').format();
  const toDate = moment().utc().endOf('week').add(1, 'days').endOf('day').format();

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    meta: {
      eventType: 'thisweekend'
    },
    promise: (client) => client.post('/Event/GetActiveByRangeFromDate', {
      data: {
        dateStart: startDate,
        dateEnd: toDate,
        limit: limit,
        offset: offset
      }
    })
  };
}

export function listThisWeek(limit, offset) {
  const startDate = moment().utc().startOf('day').format();
  const toDate = moment().utc().endOf('week').add(1, 'days').endOf('day').format();

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    meta: {
      eventType: 'thisweek'
    },
    promise: (client) => client.post('/Event/GetActiveByRangeFromDate', {
      data: {
        dateStart: startDate,
        dateEnd: toDate,
        limit: limit,
        offset: offset
      }
    })
  };
}

