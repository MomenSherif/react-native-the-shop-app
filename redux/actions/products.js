export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  id,
});

export const createProduct = (title, description, imageUrl, price) => ({
  type: CREATE_PRODUCT,
  product: { title, description, imageUrl, price },
});

export const updateProduct = (id, title, description, imageUrl) => ({
  type: UPDATE_PRODUCT,
  id,
  product: { title, description, imageUrl },
});