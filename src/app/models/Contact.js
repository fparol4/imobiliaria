const sequelizePaginate = require("sequelize-paginate");

module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define("Contact", {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    house_id: DataTypes.STRING,
    house_cod: DataTypes.STRING,
    description: DataTypes.STRING
  });
  return Property;
};
