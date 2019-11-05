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
router.get('/:id', async (req, res, next) => {
  try {
    await Products.findByPk(req.params.id).then(product => {
      if (!product) return res.sendStatus(404)
      res.send(product)
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
