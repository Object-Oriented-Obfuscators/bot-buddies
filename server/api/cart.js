const router = require('express').Router()
const {Carts, CartsProducts, Products} = require('../db/models/index')

router.get('/', async (req, res, next) => {
  let cart
  try {
    if (req.session.cartId) {
      cart = await Carts.findByPk(req.session.cartId, {
        include: {model: Products}
      })
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
  let newCart
  try {
    const product = await Products.findByPk(req.body.id)

    if (!product) {
      res.status(404).send('Product Does Not Exist') // niceee
    } else {
      const cart = await Carts.findByPk(req.session.cartId)

      // If this is a new session, create a new cart
      if (!req.session.cartId || !cart) { // could probably use middleware for this too
        // If user is logged in, the new cart will contain the user's info
        if (req.user) { // turn this into middleware
          newCart = await Carts.create({userId: req.user.id})
        } else {
          // Else, client is a quest. Create the new cart with no user info
          newCart = await Carts.create()
        }
        req.session.cartId = newCart.id // don't depend on sessions to hold your cartId for you
      }

      let productInCart = await CartsProducts.findOne({ // use findOrCreate.
        where: {
          cartId: req.session.cartId,
          productId: product.id
        }
      })

      // if product does not exist in cart, add to cart
      if (!productInCart) {
        productInCart = await CartsProducts.create({
          qty: 1,
          cartId: req.session.cartId,
          productId: product.id
        })
      } else {
        // otherwise, increase the product's qty in cart
        productInCart.qty += 1
        productInCart = await productInCart.save()
      }
      res.send(productInCart)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
