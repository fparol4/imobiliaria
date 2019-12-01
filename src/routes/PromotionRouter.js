const router = require('express').Router({ mergeParams: true })

/** Controllers */
const PromotionController = require('../app/controllers/PromotionController')

/** Validators */
const PromotionValidator = require('../app/validators/PromotionValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

/** Authenticated */
router.use(AuthMiddleware)
router.put('', PromotionController.update)
router.post('', PromotionValidator('store'), PromotionController.store)

module.exports = router
