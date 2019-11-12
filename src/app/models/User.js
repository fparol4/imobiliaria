const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/** Configurations */
const JWTConfig = require('../../config/jwt')

/** Utils */
const Utils = require('../utils')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    full_name: {
      type: DataTypes.VIRTUAL,
      get () {
        return `${this.getDataValue('first_name')} ${this.getDataValue('last_name')}`
      }
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: true
    },
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  })

  User.addHook('beforeSave', async user => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8)
    }
  })

  User.prototype.visible = function () {
    return Utils.hideAttributes(this.dataValues, ['id', 'first_name', 'last_name', 'full_name', 'email'])
  }

  User.auth = async function ({ email, password }) {
    const user = await User.findOne({ where: { email } })
    const auth = await bcrypt.compare(password, user.password_hash)
    if (!auth) { throw new Error('JWT Authentication failed') }
    return this.generateToken(user)
  }

  User.generateToken = async function ({ id }) {
    return jwt.sign({ id }, JWTConfig.SECRET, { expiresIn: JWTConfig.TIME })
  }

  return User
}
