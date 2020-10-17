import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT } from '../actions/products';

const productsReducerInitialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
}

const productsReducer = (state = productsReducerInitialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(prod => prod.id !== action.id),
        userProducts: state.userProducts.filter(prod => prod.id !== action.id),
      };
    default:
      return state;
  }
};

export default productsReducer;