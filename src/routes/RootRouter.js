const router = require('express').Router()

/** Controllers */
const RootController = require('../app/controllers/RootController')

router.get('', RootController.index)

module.exports = router
