let router = require("express").Router();
var Controller = require("../controller/userController");
router.route("/register").post(Controller.register);
router.route("/login").post(Controller.login);
router.route("/");

module.exports = router;
