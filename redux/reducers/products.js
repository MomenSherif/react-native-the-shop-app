import PRODUCTS from '../../data/dummy-data';

const productsReducerInitialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
}

const productsReducer = (state = productsReducerInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default productsReducer;