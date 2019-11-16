'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user_roles', [
      {
        role_name: 'owner',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_name: 'manager',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        role_name: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user_roles', null, {})
}
