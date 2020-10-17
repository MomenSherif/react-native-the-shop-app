import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/products';

const productsReducerInitialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
}

const productsReducer = (state = productsReducerInitialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const { title, imageUrl, description, price } = action.product;
      const newProduct = new Product(new Date().toString(), 'u1', title, imageUrl, description, price);
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

    case UPDATE_PRODUCT:
      const { id, product } = action;
      const oldProduct = state.userProducts.find(prod => prod.id === id);
      const updatedProduct = new Product(
        id,
        oldProduct.ownerId,
        product.title,
        product.imageUrl,
        product.description,
        oldProduct.price);
      return {
        ...state,
        userProducts: state.userProducts.map(prod => prod.id !== id ? prod : updatedProduct),
        availableProducts: state.availableProducts.map(prod => prod.id !== id ? prod : updatedProduct),
      };
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