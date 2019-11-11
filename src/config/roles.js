const AC = require('accesscontrol')
const AccessControl = new AC()

const permissions = ['home', 'user']

AccessControl.grant('user')
  .readAny('home')
  .lock()

AccessControl.grant('dealer')
  .extend('user')
  .createOwn('home')
  .updateOwn('home')
  .lock()

AccessControl.grant('manager')
  .extend('dealer')
  .readAny(permissions)
  .lock()

AccessControl.grant('admin')
  .extend('manager')
  .createAny(permissions)
  .updateAny(permissions)
  .lock()

module.exports = AccessControl
