import { ADD_TO_CART } from '../actions/cart';
import CartItem from '../../models/cartItem';

const cartReducerInitialState = {
  items: {},
  totalAmount: 0,
};

const cartReducer = (state = cartReducerInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, title, price } = action.product;
      let updatedOrNewCartItem;
      if (state.items[id]) {
        updatedOrNewCartItem =
          new CartItem(state.items[id].quantity + 1, price, title, (state.items[id].quantity + 1) * price);
      } else {
        updatedOrNewCartItem = new CartItem(1, price, title, price);
      }

      return {
        ...state,
        items: {
          ...state.items,
          [id]: updatedOrNewCartItem,
        },
        totalAmount: state.totalAmount + price,
      }

    default:
      return state;
  }
};

export default cartReducer;