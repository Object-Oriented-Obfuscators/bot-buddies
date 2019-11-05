import axios from 'axios'

// action type
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

// action creator
const gotSingleProduct = singleProduct => {
  return {
    type: GOT_SINGLE_PRODUCT,
    singleProduct
  }
}

// thunks
export const getSingleProduct = id => async dispatch => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(gotSingleProduct(data))
}

// reducer
const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}

export default singleProductReducer
