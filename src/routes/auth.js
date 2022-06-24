const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/userControllers");
const passport = require("passport");

router.post("/register", registerUser);
router.post("/login", passport.authenticate("local"), loginUser);

module.exports = router;
