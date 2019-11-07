const db = require('../db')
const user = require('../models/user')
const Products = require('../models/Products')
const {Orders, OrdersProducts} = require('./Orders')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Orders.belongsTo(user)
user.hasMany(Orders)

Orders.belongsToMany(Products, {
  through: 'OrdersProducts'
})

Products.belongsToMany(Orders, {through: 'OrdersProducts'})

module.exports = {
  Orders,
  OrdersProducts,
  user,
  Products,
  db
}
