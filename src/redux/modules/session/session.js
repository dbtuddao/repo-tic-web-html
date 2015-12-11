export const INIT = 'tix/session/INIT';
export const LOAD = 'tix/session/LOAD';
export const LOAD_SUCCESS = 'tix/session/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/session/LOAD_FAIL';
export const SAVE = 'tix/session/SAVE';
export const SAVE_SUCCESS = 'tix/session/SAVE_SUCCESS';
export const SAVE_FAIL = 'tix/session/SAVE_FAIL';
export const CLEAR = 'tix/session/CLEAR';
export const CLEAR_SUCCESS = 'tix/session/CLEAR_SUCCESS';
export const CLEAR_FAIL = 'tix/session/CLEAR_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        loaded: true,
        data: action.payload
      };
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
    case SAVE:
      return {
        ...state,
        saveLoading: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        saveLoading: false,
        saveLoaded: true,
        saveError: null,
        data: {
          ...state.data,
          [action.meta.name]: action.meta.data
        }
      };
    case SAVE_FAIL:
      return {
        ...state,
        saveLoading: false,
        saveLoaded: false,
        saveError: action.error,
      };
    case CLEAR:
      return {
        ...state,
        clearLoading: true
      };
    case CLEAR_SUCCESS:
      return {
        ...state,
        clearLoading: false,
        clearLoaded: true,
        clearError: null,
        data: null
      };
    case CLEAR_FAIL:
      return {
        ...state,
        clearLoading: false,
        clearLoaded: false,
        saveError: action.error,
      };
    default:
      return state;
  }
}

export function get() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/_session')
  };
}

export function save(name, data) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/_session/' + name, {
      data
    }),
    meta: { name, data}
  };
}

export function clear() {
  return {
    types: [CLEAR, CLEAR_SUCCESS, CLEAR_FAIL],
    promise: (client) => client.del('/_session/')
  };
}
