const router = require('express').Router()

/** Controllers */
const UserController = require('../app/controllers/UserController')

/** Validators */
const UserValidator = require('../app/validators/UserValidator')

// router.get('', UserController.index)
router.post('', UserValidator, UserController.store)
// router.get('/:id', UserController.show)
// router.put('/:id', UserController.update)
// router.delete('/:id', UserController.destroy)

module.exports = router
