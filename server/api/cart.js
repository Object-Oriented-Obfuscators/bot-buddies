const router = require('express').Router()
const {Orders, OrdersProducts, Products} = require('../db/models/index')

//Middleware to assign req.session.orderId if the user has an open cart, otherwise create a new cart and assign that.
router.use(async (req, res, next) => {
  try {
    let currentOrder
    if (req.user) {
      currentOrder = await Orders.findOrCreate({
        where: {
          userId: req.user.id,
          complete: false
        }
      })
      currentOrder = currentOrder[0]
    } else if (req.session.orderId) {
      currentOrder = await Orders.findOne({
        where: {
          id: req.session.orderId
        }
      })
    } else {
      currentOrder = await Orders.create()
    }
    req.session.orderId = currentOrder.id
    next()
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  let order
  try {
    if (req.session.orderId) {
      order = await Orders.findOne({
        where: {id: req.session.orderId},
        include: {model: Products}
      })
      if (!order) {
        res.sendStatus(404)
      } else {
        res.send(order)
      }
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.body.id)
    if (!product) {
      res.status(404).send('Product Does Not Exist')
    }

    let productInCart = await OrdersProducts.findOne({
      where: {
        orderId: req.session.orderId,
        productId: product.id
      }
    })

    // if product does not exist in cart, add to cart
    if (!productInCart) {
      productInCart = await OrdersProducts.create({
        qty: 1,
        orderId: req.session.orderId,
        productId: product.id
      })
    } else {
      // otherwise, increase the product's qty in cart
      productInCart.qty += 1
      productInCart = await productInCart.save()
    }
    res.send(
      await Orders.findOne({
        where: {id: req.session.orderId},
        include: {model: Products}
      })
    )
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  await Promise.all(
    req.body.changes.map(change => {
      return OrdersProducts.update(
        {qty: change.qty},
        {where: {orderId: change.orderId, productId: change.productId}}
      )
    })
  )
  let data = await Orders.findOne({
    where: {id: req.session.orderId},
    include: {model: Products}
  })
  res.send(data)
})

router.delete('/:productId/:orderId', async (req, res, next) => {
  try {
    const productId = req.params.productId
    const orderId = req.params.orderId

    const product = await OrdersProducts.findOne({
      where: {productId: productId, orderId: orderId}
    })

    if (!product) {
      res.status(404).send('Product Does Not Exist')
    } else {
      await product.destroy()

      res.send(
        await Orders.findOne({
          where: {id: orderId},
          include: {model: Products}
        })
      )
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
