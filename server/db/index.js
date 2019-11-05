// consider deleting file
const db = require('./db')

// register models
const Products = require('./models/Products')
const Users = require('./models/Users')

// associations

module.exports = {db, Products, Users}
