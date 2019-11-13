const app = require('../../src/app')
const SuperTest = require('supertest')

/** @Models */
const { UserRole } = require('../../src/app/models')

/** @Factories */
const FactoryGirl = require('../factories')

/** @Fakers */
const UserFaker = require('../factories/fakers/UserFaker')

/** @Utils */
const TruncateTables = require('../utils/Truncate')
const Seed = require('../utils/Seed')

/** @Setup */
Seed.seedRoles()

beforeEach(async () => {
  await TruncateTables()
})

test('POST /users | Should create and return a user with 201 HTTP status code', async () => {
  const { body: responseBody } = await SuperTest(app)
    .post('/api/v1/users')
    .set('Accept', 'application/json')
    .send(UserFaker.store())
    .expect(600)

  expect(responseBody).toHaveProperty('dasd')
})
