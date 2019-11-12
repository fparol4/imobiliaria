const router = require('express').Router()

/** Controllers */
const SessionController = require('../app/controllers/SessionController')

/** Validators */
const SessionValidator = require('../app/validators/SessionValidator')

router.post('', SessionValidator.store, SessionController.store)

module.exports = router
