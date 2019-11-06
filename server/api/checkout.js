const router = require('express').Router()
const {Carts, CartsProducts, Products} = require('../db/models/index')

router.put('/', async (req, res, next) => {
  try {
    await Carts.update(
      {
        total: 509
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
