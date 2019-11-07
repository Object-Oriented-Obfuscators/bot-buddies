import axios from 'axios'

// Action Type
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const EDIT_CART = 'EDIT_CART'

// Action Creator
export const gotCart = cart => {
  return {
    type: GET_CART,
    cart
  }
}

export const addToCart = cart => {
  return {
    type: ADD_TO_CART,
    cart
  }
}

// changes  = {changes: [{qty, prodId, cartId}, {}...]}
export const editCart = cart => {
  return {
    type: EDIT_CART,
    cart
  }
}

// Thunk Creator

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

// reducer

const cartReducer = (cart = {}, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART: {
      return action.cart
    }
    case EDIT_CART: {
      return action.cart
    }
    default:
      return cart
  }
}

export default cartReducer
