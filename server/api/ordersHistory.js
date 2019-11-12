const router = require('express').Router()
const {Orders, Products} = require('../db/models/index')

router.use((req, res, next) => {
  if (!req.user) {
    res.status(403).send('Unauthorized: Please log in to continue')
    res.end()
  } else {
    next()
  }
})

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

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Orders.findOne({
      where: {id: req.params.id},
      include: {model: Products}
    })
    if (order.userId !== req.user.id) {
      res.status(403).send('Unauthorized: This is not your order')
    } else {
      res.send(order)
    }
  } catch (e) {
    next(e)
  }
})

module.exports = router
