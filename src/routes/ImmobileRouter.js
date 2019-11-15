const router = require('express').Router()

/** Controllers */
const ImmobileController = require('../app/controllers/ImmobileController')

/** Validators */
const ImmobileValidator = require('../app/validators/ImmobileValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

router.get('', ImmobileController.index)

/** Authenticated */
router.use(AuthMiddleware)
router.post('', ImmobileValidator('store'), ImmobileController.store)

module.exports = router
