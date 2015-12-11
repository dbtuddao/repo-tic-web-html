export const UPDATE_CART = 'tix/cart/UPDATE_CART';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_CART:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}

export function updateCart(id, qty) {
  return {
    type: UPDATE_CART,
    payload: {
      id,
      qty
    }
  };
}
