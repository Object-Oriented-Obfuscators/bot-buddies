// products sub-reducer
import axios from 'axios'

// action types
const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'

// action creators
const gotAllProducts = products => {
  return {
    type: GOT_ALL_PRODUCTS,
    products
  }
}

// thunks
export const getAllProducts = () => async dispatch => {
  const {data} = await axios.get('/api/products')
  dispatch(gotAllProducts(data))
}

// reducer
const productsReducer = (products = [], action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.products
    default:
      return products
  }
}

export default productsReducer
