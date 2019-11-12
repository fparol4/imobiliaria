const bcrypt = require('bcryptjs')

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
    email: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    password_hash: DataTypes.STRING
  })

  User.associate = function (models) {
    User.belongsTo(models.UserRole, { foreignKey: 'role_id', as: 'role' })
  }

  User.addHook('beforeSave', async user => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8)
    }
  })

  User.prototype.visible = function (visibleAttributes = ['id', 'first_name', 'last_name', 'full_name', 'email']) {
    return Utils.hideAttributes(this.dataValues, visibleAttributes)
  }

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password_hash)
  }

  return User
}
