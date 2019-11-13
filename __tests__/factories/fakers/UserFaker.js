const Faker = require('faker')

module.exports.store = () => ({
  id: Faker.random.number(),
  first_name: Faker.name.firstName(),
  last_name: Faker.name.lastName(),
  email: Faker.internet.email(),
  password: Faker.internet.password(7)
})
