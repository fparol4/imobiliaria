'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },

      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },

      password_hash: {
        allowNull: false,
        type: Sequelize.STRING
      },

      type: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'user'
      },

      recovery_token: {
        type: Sequelize.INTEGER
      },

      recovery_token_created_at: {
        type: Sequelize.DATE
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users')
  }
}
