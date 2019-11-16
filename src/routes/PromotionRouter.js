const router = require('express').Router({ mergeParams: true })

/** Controllers */
const PromotionController = require('../app/controllers/PromotionController')

/** Validators */
const PromotionValidator = require('../app/validators/PromotionValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')

router.put('', PromotionController.update)

/** Authenticated */
router.use(AuthMiddleware)
router.post('', PromotionValidator('store'), PromotionController.store)

module.exports = router
