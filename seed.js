const {db} = require('./server/db')
const {green, red} = require('chalk')

const Products = require('./server/db/models/Products')
const Users = require('./server/db/models/Users')

const products = [
  {
    name: 'Hug Bot',
    description:
      'Hugs are a little cold and metallic, but cold hugs are better than no hugs!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Probe_Droid_FDGMK.png/revision/latest?cb=20190304145014',
    price: 399.99,
    stock: 3
  },
  {
    name: 'Hug Bot',
    description:
      'Hugs are a little cold and metallic, but cold hugs are better than no hugs!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Probe_Droid_FDGMK.png/revision/latest?cb=20190304145014',
    price: 399.99,
    stock: 3
  },
  {
    name: 'Hug Bot',
    description:
      'Hugs are a little cold and metallic, but cold hugs are better than no hugs!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Probe_Droid_FDGMK.png/revision/latest?cb=20190304145014',
    price: 399.99,
    stock: 3
  },
  {
    name: 'Hug Bot',
    description:
      'Hugs are a little cold and metallic, but cold hugs are better than no hugs!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Probe_Droid_FDGMK.png/revision/latest?cb=20190304145014',
    price: 399.99,
    stock: 3
  },
  {
    name: 'Hug Bot',
    description:
      'Hugs are a little cold and metallic, but cold hugs are better than no hugs!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Probe_Droid_FDGMK.png/revision/latest?cb=20190304145014',
    price: 399.99,
    stock: 3
  },
  {
    name: 'Hug Bot',
    description:
      'Hugs are a little cold and metallic, but cold hugs are better than no hugs!',
    imageUrl:
      'https://vignette.wikia.nocookie.net/starwars/images/a/a9/Probe_Droid_FDGMK.png/revision/latest?cb=20190304145014',
    price: 399.99,
    stock: 3
  }
]

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe35@gmail.com',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png',
    address: '354 Fifth Ave, Barnesville, OK',
    password: 'happy345',
    phone: 9873458346
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'whodoneit57@yahoo.com',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg',
    address: '87 Main St, Burgertown, MI',
    password: 't3ddyB3ars445',
    phone: 9462854299
  },
  {
    firstName: 'Mary',
    lastName: 'Poppins',
    email: 'pdubs138@outlook.com',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6d/Chewbacca-2-.jpg',
    address: '77 Turle Ave, Bakersville, WA',
    password: 'umbrella999',
    phone: 7326549367
  }
]

const seed = async () => {
  await db.sync({force: true})

  await Promise.all(
    products.map(product => {
      return Products.create(product)
    })
  )

  await Promise.all(
    users.map(user => {
      return Users.create(user)
    })
  )

  console.log(green('Seeding successfull'))
  db.close()
}

seed().catch(err => {
  console.error(red('Seed Unsuccessfull'))
  console.error(err)
  db.close()
})
