const router = require("express").Router({ mergeParams: true });

/** Controllers */
const Controller = require("../app/controllers/ContactController");

/** Validators */
const Validator = require("../app/validators/ContactValidator");

/** Middlewares */
const AuthMiddleware = require("../app/middlewares/Auth");

router.post("", Validator("store"), Controller.store);

/** Authenticated */
router.use(AuthMiddleware);
router.get("", Controller.show);

module.exports = router;
