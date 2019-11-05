const db = require('../db')
const user = require('../models/user')
const Products = require('../models/Products')
const {Carts, CartsProducts} = require('./Carts')

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

Carts.belongsTo(user)
user.hasMany(Carts)

Carts.belongsToMany(Products, {
  through: 'CartsProducts'
})

Products.belongsToMany(Carts, {through: 'CartsProducts'})

module.exports = {
  Carts,
  CartsProducts,
  user,
  Products,
  db
}
