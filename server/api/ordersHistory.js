const router = require('express').Router()
const {Orders, Products} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  try {
    const orders = await Orders.findAll({
      where: {userId: req.user.id, complete: true},
      include: {model: Products}
    })
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
