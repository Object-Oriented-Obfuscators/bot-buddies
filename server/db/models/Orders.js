const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

const OrdersProducts = db.define('OrdersProducts', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = {Orders, OrdersProducts}
