module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    original_name: DataTypes.STRING,
    file_name: DataTypes.STRING
  })

  File.associate = function (models) {
    File.belongsTo(models.Property, { foreignKey: 'id', as: 'owner' })
  }

  return File
}
