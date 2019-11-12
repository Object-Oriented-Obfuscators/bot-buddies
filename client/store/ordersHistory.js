import axios from 'axios'

const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

const gotAllOrders = orders => {
  return {
    type: GOT_ALL_ORDERS,
    orders
  }
}

export const getAllOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(gotAllOrders(data))
  } catch (error) {
    console.error(error)
  }
}

const ordersReducer = (orders = [], action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return action.orders
    default:
      return orders
  }
}

export default ordersReducer
