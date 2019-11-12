import axios from 'axios'

//Action Types

const GET_ORDER = 'GET_ORDER'

//Action Creator

const gotOrder = singleOrder => ({
  type: GET_ORDER,
  singleOrder
})

//Thunk

export const getOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${orderId}`)
      dispatch(gotOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//Reducer
const singleOrderReducer = (singleOrder = {}, action) => {
  switch (action.type) {
    case GET_ORDER:
      return action.singleOrder
    default:
      return singleOrder
  }
}

export default singleOrderReducer
