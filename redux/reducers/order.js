import { ADD_ORDER } from '../actions/order';
import Order from '../../models/order';

const orderReducerInitialState = []

const orderReducer = (state = orderReducerInitialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { cartItems, totalAmount } = action.order;
      const newOrder = new Order(new Date().toString(), cartItems, totalAmount, new Date());
      return [...state, newOrder];
    default:
      return state;
  }
};

export default orderReducer;