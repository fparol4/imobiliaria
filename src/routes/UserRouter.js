const router = require('express').Router()

/** Controllers */
const UserController = require('../app/controllers/UserController')

// router.get('', UserController.index)
router.post('', UserController.store)
// router.get('/:id', UserController.show)
// router.put('/:id', UserController.update)
// router.delete('/:id', UserController.destroy)

module.exports = router
