const router = require('express').Router()
const {Orders, OrdersProducts, Products} = require('../db/models/index')

router.put('/', async (req, res, next) => {
  try {
    const orderId = req.session.orderId
    let order = await Orders.findByPk(orderId)
    if (order.complete === true) {
      res.send(order)
    } else {
      const updatedOrder = await OrdersProducts.findAll({
        where: {orderId}
      })

      let complete = true

      while (complete) {
        updatedOrder.forEach(async item => {
          let product = await Products.findByPk(item.productId)
          if (item.qty > product.stock) {
            complete = false
            throw new Error(`Error`)
          }
        })
      }

      updatedOrder.forEach(async item => {
        let product = await Products.findByPk(item.productId)
        await product.update({stock: product.stock - item.qty})
      })

      order = await order.update({complete})
      res.send(order)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
// let complete = true
// updatedOrder.forEach(async item => {
//   let product = await Products.findByPk(item.productId)
//   try {
//     if (item.qty > product.stock || complete === false) {
//       complete = false
//       order = await order.update({complete})
//       throw new Error(
//         'Item quantity exceeds stock. Please modify your cart.'
//       )
//     } else {
//     }
//   } catch (error) {
//     next(error)
//   }
// })

// let error = false

//       let complete = false
//       updatedOrder.forEach(async item => {
//         let product = await Products.findByPk(item.productId)
//         if (item.qty > product.stock || error) error = true
//       })

//       if (!error) {
//         complete = true
//         updatedOrder.forEach(async item => {
//           let product = await Products.findByPk(item.productId)
//           await product.update({stock: product.stock - item.qty})
//         })
