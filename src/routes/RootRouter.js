const router = require('express').Router()

/** Controllers */
const RootController = require('../app/controllers/RootController')

router.get('', RootController.index)
// router.post('', RootController.store)
// router.get('/:id', RootController.show)
// router.put('/:id', RootController.update)
// router.delete('/:id', RootController.destroy)

module.exports = router
