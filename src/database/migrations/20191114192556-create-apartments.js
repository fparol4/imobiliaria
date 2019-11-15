'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('immobiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      owner_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      area: {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      dorms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },

      animals: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },

      value: {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      iptu: {
        allowNull: false,
        type: Sequelize.FLOAT
      },

      condominium: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      },

      neighbourhood: {
        allowNull: false,
        type: Sequelize.STRING
      },

      city: {
        allowNull: false,
        type: Sequelize.STRING
      },

      description: {
        allowNull: false,
        type: Sequelize.STRING
      },

      operation: {
        allowNull: false,
        type: Sequelize.STRING
      },

      finality: {
        allowNull: false,
        type: Sequelize.STRING
      },

      garages: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 0
      },

      promotion_value: {
        type: Sequelize.FLOAT
      },

      promotion_end: {
        type: Sequelize.DATE
      },

      in_promotion: {
        type: Sequelize.BOOLEAN
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('immobiles')
  }
}
