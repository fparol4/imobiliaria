'use strict'

const bulkObject = () => {
  return ['user', 'dealer', 'manager', 'admin'].reduce((pre, curr) => {
    pre.append(
      {
        role_name: curr,
        created_at: new Date(),
        updated_at: new Date()
      })
    return pre
  }, [])
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (queryInterface.bulkInsert('user_roles', bulkObject(), {}))
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user_roles', null, {})
}
