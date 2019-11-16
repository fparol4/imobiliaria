const router = require('express').Router()

/** Routers */
const PromotionRouter = require('./PromotionRouter')

/** Controllers */
const PropertyController = require('../app/controllers/PropertyController')

/** Validators */
const PropertyValidator = require('../app/validators/PropertyValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

router.get('', PropertyController.index)
router.use('/:houseId/promotions', PromotionRouter)

/** Authenticated */
router.use(AuthMiddleware)
router.post('', PropertyValidator('store'), PropertyController.store)
router.put('/:id', PropertyController.update)

module.exports = router
