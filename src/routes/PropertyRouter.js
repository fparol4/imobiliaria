const router = require('express').Router()

/** Routers */
const PromotionRouter = require('./PromotionRouter')

/** Controllers */
const PropertyController = require('../app/controllers/PropertyController')
const PropertyFilesController = require('../app/controllers/PropertyFilesController')

/** Validators */
const PropertyValidator = require('../app/validators/PropertyValidator')

/** Middlewares */
const AuthMiddleware = require('../app/middlewares/Auth')
const FileMiddleware = require('../config/multer')
const FileAuthMiddleware = require('../app/middlewares/FileAuthMiddleware')

router.get('', PropertyController.index)
router.use('/:houseId/promotions', PromotionRouter)

router.get('/:houseId/files/:id', PropertyFilesController.show)
router.get('/:id', PropertyController.show)

/** Authenticated */
router.use(AuthMiddleware)
router.post('', PropertyValidator('store'), PropertyController.store) //  PropertyValidator('store'),
router.put('/:id', PropertyController.update)
router.delete('/:id', PropertyController.delete)

router.post('/:houseId/files', FileAuthMiddleware, FileMiddleware.array('photo'), PropertyFilesController.store)
router.delete('/:houseId/files/:id', FileAuthMiddleware, PropertyFilesController.delete)

module.exports = router
