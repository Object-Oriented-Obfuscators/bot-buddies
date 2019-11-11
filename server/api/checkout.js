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
        await order.update({complete: canFulfill})
        order = await Orders.findOne({
          where: {id: req.session.orderId},
          include: {model: Products}
        })
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
