export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (items, amount) => ({
  type: ADD_ORDER,
  order: { items, amount }
})