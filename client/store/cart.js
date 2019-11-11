import axios from 'axios'

// Action Type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = 'EDIT_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
const CHECKOUT = 'CHECKOUT'

// Action Creator
export const gotCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const checkedOut = cart => {
  return {
    type: CHECKOUT,
    cart
  }
}

export const addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

export const cartRemove = cart => {
  return {
    type: REMOVE_FROM_CART,
    cart
  }
}

export const editCart = cart => {
  return {
    type: EDIT_CART,
    cart
  }
}

// Thunk Creator

export const checkout = () => async dispatch => {
  try {
    const {data} = await axios.put('/api/checkout')
    dispatch(checkedOut(data))
  } catch (error) {
    console.error(error)
  }
}

export const getCart = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/cart')
    dispatch(gotCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const addToCartThunk = product => async dispatch => {
  try {
    const {data} = await axios.post('/api/cart', product)
    dispatch(addToCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const editCartThunk = changes => async dispatch => {
  try {
    const {data} = await axios.put('/api/cart', changes)
    dispatch(editCart(data))
  } catch (error) {
    console.error(error)
  }
}

export const removeFromCart = product => async dispatch => {
  try {
    const {data} = await axios.delete(
      `/api/cart/${product.productId}/${product.orderId}`
    )
    dispatch(cartRemove(data))
  } catch (error) {
    console.error(error)
  }
}

// reducer

const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case CHECKOUT:
      return action.cart
    case GET_CART:
      return action.cart
    case ADD_TO_CART: {
      return action.cart
    }
    case EDIT_CART: {
      return action.cart
    }
    case REMOVE_FROM_CART:
      return action.cart
    default:
      return cart
  }
}

export default cartReducer
