const router = require('express').Router()
const {Carts, CartsProducts, Products} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  let cart
  try {
    if (req.session.cartId) {
      cart = await Carts.findByPk(req.session.cartId)
      if (!cart) {
        res.sendStatus(404)
      } else {
        res.send(cart)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  let cart
  let newCart
  try {
    if (!req.session.cartId) {
      if (req.user) {
        newCart = await Carts.create({userId: req.user.id})
      } else {
        newCart = await Carts.create()
      }
      req.session.cartId = newCart.id
    }
    let product = await Products.findByPk(req.body.productId)
    cart = await Carts.findByPk(req.session.cartId, {
      include: {model: Products}
    })
    cart.addProducts(product)
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router
