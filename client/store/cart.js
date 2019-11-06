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

export const addToCart = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

export const editCart = product => {
  return {
    type: EDIT_CART,
    product
  }
}

// Thunk Creator

export const getCart = () => async dispatch => { // try/catches here
  const {data} = await axios.get('/api/cart')
  dispatch(gotCart(data))
}

export const addToCartThunk = product => async dispatch => {
  const {data} = await axios.post('/api/cart', product)
  dispatch(addToCart(data))
}

// export const editCartThunk = product => async dispatch => {
//   const {data} = await axios.put('/api/cart', product)
//   dispatch(editCart(data))
// }

// reducer

const cartReducer = (cart = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case ADD_TO_CART: {
      let replaced = false
      let newCart = [...cart]
      // loop through the cart to find product with outdated qty
      for (let i = 0; i < newCart.length; i++) { // could be worthwhile to use some array methods here
        if (newCart[i].productId === action.product.productId) {
          newCart[i] = action.product
          replaced = true
          break
        }
      }
      // if no product is found, then add the product to the cart
      if (!replaced) {
        newCart.push(action.product)
      }

      return newCart
    }
    default:
      return cart
  }
}

export default cartReducer
