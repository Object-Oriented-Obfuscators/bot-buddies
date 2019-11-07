const Sequelize = require('sequelize')
const db = require('../db')

const Orders = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
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
