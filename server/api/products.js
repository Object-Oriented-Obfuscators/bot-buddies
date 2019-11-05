'use strict'

const router = require('express').Router()
const Products = require('../db/models/Products')

// route serves up all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll()
    res.send(products)
  } catch (error) {
    next(error)
  }
})

// route for single product view
// router.get('/:id', async(req, res, next) => {
//   try {
//     Products.findById(req.params.id)
//   } catch (error) {
//       next(error)
//   }
// })

module.exports = router
