/** Models */
const { UserRole } = require('../../src/app/models')

module.exports.seedRoles = async () => {
  await UserRole.bulkCreate([
    {
      role_name: 'user',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      role_name: 'dealer',
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
  ])
}
