const FactoryGirl = require('factory-girl').factory

/** Models */
const { User } = require('../../src/app/models')

/** Fakers */
const UserFaker = require('./fakers/UserFaker')

FactoryGirl.define('user', User, UserFaker.store)

module.exports = FactoryGirl
