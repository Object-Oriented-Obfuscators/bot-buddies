const router = require('express').Router()
const {Carts, CartsProducts, Products} = require('../db/models/index')

router.put('/', async (req, res, next) => {
  let grandTotal = 0
  try {
    const cart = await Carts.findByPk(req.session.cartId, {
      include: [{model: Products}]
    })
    for (let i = 0; i < cart.products.length; i++) {
      grandTotal += cart.products[i].price * cart.products[i].CartsProducts.qty
    }
    await Carts.update(
      {
        total: grandTotal,
        date: new Date()
      },
      {
        where: {
          id: req.session.cartId
        }
      }
    ).then(res.sendStatus(200))
  } catch (error) {
    next(error)
  }
})

module.exports = router
