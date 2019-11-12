const router = require('express').Router()

/** Controllers */
const UserController = require('../app/controllers/UserController')

/** Validators */
const UserValidator = require('../app/validators/UserValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

router.post('', UserValidator.store, UserController.store)

/** Authenticated */
router.use(AuthMiddleware)
router.get('/:id', UserController.show)

module.exports = router
