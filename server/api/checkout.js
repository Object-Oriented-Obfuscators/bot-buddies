const router = require('express').Router()
const {Carts, CartsProducts, Products} = require('../db/models/index')

router.put('/', async (req, res, next) => {
  let total = 0
  try {
    const cart = await Carts.findByPk(req.session.cartId, {
      include: [{model: Products}]
    })

    // await Carts.update(
    //   {
    //     total: 509,
    //     date: new Date()
    //   },
    //   {
    //     where: {
    //       id: req.session.cartId
    //     }
    //   }
    // ).then(res.sendStatus(200))
  } catch (error) {
    next(error)
  }
})

module.exports = router
