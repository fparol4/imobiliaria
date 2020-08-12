'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      property_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'properties',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      original_name: {
        allowNull: false,
        type: Sequelize.STRING
      },

      file_name: {
        allowNull: false,
        type: Sequelize.STRING
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files')
  }
}
