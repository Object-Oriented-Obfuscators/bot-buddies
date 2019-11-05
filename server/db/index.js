// consider deleting file
const db = require('./db')

// register models
const Products = require('./models/Products')
const user = require('./models/user')

// associations

module.exports = {db, Products, user}
