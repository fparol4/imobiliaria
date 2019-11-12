const AccessControl = new (require('accesscontrol'))()

AccessControl.grant('user')
  .readOwn('user', ['*', '!password_hash'])
  .readAny('home')

AccessControl.grant('dealer')
  .extend('user')

AccessControl.grant('manager')
  .extend('dealer')
  .readAny('user', ['*', '!password_hash'])

AccessControl.grant('admin')
  .extend('manager')
  .readAny('user', ['*'])
  .lock()

module.exports = AccessControl
