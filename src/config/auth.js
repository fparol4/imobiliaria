const AccessControl = new (require('accesscontrol'))()

AccessControl.grant('user')
  .readOwn('user', ['*', '!password_hash'])
  .updateOwn('user', ['*', '!role_id'])

  .readAny('home')

AccessControl.grant('dealer')
  .extend('user')

  .createAny('home')
  .updateOwn('home')

AccessControl.grant('manager')
  .readAny('user', ['*', '!password_hash'])

AccessControl.grant('admin')
  .extend('manager')

  .createAny('home')
  .readAny('home')
  .updateAny('home')
  .deleteAny('home')

  .readAny('user', ['*'])
  .updateAny('user')

  .lock()

module.exports = AccessControl
