const router = require('express').Router()
const {Orders, OrdersProducts, Products} = require('../db/models/index')

router.put('/', async (req, res, next) => {
  try {
    const orderId = req.session.orderId
    let order = await Orders.findByPk(orderId)
    if (order.complete === true) {
      res.send(order)
    } else {
      const lineItems = await OrdersProducts.findAll({
        where: {orderId}
      })
      let canFulfill = true
      for (let i = 0; i < lineItems.length; i++) {
        let product = await Products.findByPk(lineItems[i].productId)
        if (product.stock >= lineItems[i].qty && canFulfill) {
          canFulfill = true
        } else {
          canFulfill = false
        }
      }

      if (canFulfill) {
        for (let i = 0; i < lineItems.length; i++) {
          let product = await Products.findByPk(lineItems[i].productId)
          await product.update({stock: product.stock - lineItems[i].qty})
        }
        order = await order.update({complete: canFulfill})
        res.send(order)
      } else {
        res.status(500).send('Not enough inventory')
      }
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
