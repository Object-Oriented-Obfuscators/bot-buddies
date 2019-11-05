const Sequelize = require('sequelize')
const db = require('../db')

const Carts = db.define('carts', {
  date: Sequelize.DATE,
  total: Sequelize.FLOAT
})

const CartsProducts = db.define('CartsProducts', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = {Carts, CartsProducts}