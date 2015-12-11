export const LOAD = 'tix/wishListCreate/LOAD';
export const LOAD_SUCCESS = 'tix/wishListCreate/LOAD_SUCCESS';
export const LOAD_FAIL = 'tix/wishListCreate/LOAD_FAIL';

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
        error: null
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

export function create(authToken, fbToken, eventID, form) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/WishList/CreateAndPostFbWall', {
      auth: authToken,
      data: {
        fbToken,
        eventID,
        ticketTypeID: form.ticketTypeID,
        maximumPrice: form.maximumPrice,
        qty: parseInt(form.qty, 10),
        comment: form.comment
      }
    })
  };
}
