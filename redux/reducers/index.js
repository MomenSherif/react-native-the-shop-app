import { combineReducers } from 'redux';
import productsReducer from './products';
import cartReducer from './cart';
import orderReducer from './order';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

export default rootReducer;