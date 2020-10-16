import { ADD_ORDER } from '../actions/order';
import Order from '../../models/order';

const orderReducerInitialState = []

const orderReducer = (state = orderReducerInitialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const { items, amount } = action.order;
      const newOrder = new Order(new Date().toString(), items, amount, new Date());
      return [...state, newOrder];
    default:
      return state;
  }
};

export default orderReducer;