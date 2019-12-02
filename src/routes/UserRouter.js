const router = require('express').Router()

/** Controllers */
const UserController = require('../app/controllers/UserController')

/** Validators */
const UserValidator = require('../app/validators/UserValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

router.get('', UserController.index)
router.post('', UserValidator('store'), UserController.store)

/** Authenticated */
router.use(AuthMiddleware)
router.get('/:id', UserController.show)
router.put('/:id', UserValidator('update'), UserController.update)

module.exports = router
