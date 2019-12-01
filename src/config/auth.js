const AccessControl = new (require('accesscontrol'))()

AccessControl.grant('owner')
  .readOwn('user', ['*', '!password_hash'])
  .updateOwn('user', ['*', '!role_id'])
  .createOwn('home')
  .updateOwn('home')
  .deleteOwn('home')
  .readAny('home')

AccessControl.grant('manager')
  .extend('owner')
  .createAny('promotion')
  // Crud Any:Home
  .updateAny('home', ['city', 'neighbourhood', 'value', 'in_promotion', 'promotion_value', 'promotion_end'])
  .deleteAny('home')
  // Crud Any:PropertyFile
  .updateAny('propertyFile')
  .deleteAny('propertyFile')

AccessControl.grant('admin')
  .extend('manager')
  // Crud Any:User
  .createAny('user')
  .readAny('user')
  .updateAny('user')
  .deleteAny('user')
  .createAny('home')
  // Crud Any:Home
  .readAny('home')
  .updateAny('home')
  .deleteAny('home')
  .lock()

module.exports = AccessControl
