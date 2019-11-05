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

    cart = await CartsProducts.create({
      cartId: req.session.cartId,
      qty: req.body.qty,
      productId: req.body.productId
    })
    res.send(cart)
  } catch (error) {
    next(error)
  }
})

module.exports = router

// else {
//   //Create a new instance of a cart, and attach the cart's id to the current session
//   cart = await Carts.create()
//   req.session.cartId = cart.id
//   //If a user is logged in, also add that user's id to the instance
// }
// if (req.user) {
//   cart.userId = req.user.id
//   cart.save().then(updatedCart => res.send(updatedCart))
// } else {
//   res.send(cart)
// }
