import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/order';
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
      };

    case REMOVE_FROM_CART:
      let updatedCartItems;
      const { productId } = action;
      const { quantity, productTitle, productPrice, sum } = state.items[productId]

      if (quantity > 1) {
        const updatedCartItem = new CartItem(quantity - 1, productPrice, productTitle, sum - productPrice);
        updatedCartItems = { ...state.items, [productId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[productId];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - productPrice,
      };
    case ADD_ORDER:
      return cartReducerInitialState;
    default:
      return state;
  }
};

export default cartReducer;