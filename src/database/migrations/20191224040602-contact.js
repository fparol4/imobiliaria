"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("contacts", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING
      },

      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },

      house_id: {
        allowNull: false,
        type: Sequelize.STRING
      },

      house_cod: {
        allowNull: false,
        type: Sequelize.STRING
      },

      description: {
        allowNull: true,
        type: Sequelize.STRING
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("contacts");
  }
};
