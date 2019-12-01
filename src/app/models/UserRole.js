module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define('UserRole', {
    role_name: DataTypes.DATE
  })

  UserRole.associate = function (models) {
    UserRole.hasMany(models.User, { foreignKey: 'role_id', as: 'users' })
  }

  return UserRole
}
