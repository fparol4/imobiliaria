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
// Seed.seedRoles()

beforeEach(async () => {
  await TruncateTables()
  return Seed.seedRoles()
})

test('Must test if an array with all user roles and this array should have a 4 length property', async () => {
  const roles = await UserRole.findAll()
  expect(roles).toHaveLength(4)
})
