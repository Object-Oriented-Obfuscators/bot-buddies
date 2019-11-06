'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: { // validations
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT, // be vewwyyyyyyy careful with calculating prices
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  stock: { // min value
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Products
