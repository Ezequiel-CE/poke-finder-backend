const router = require("express").Router();
const { registerUser } = require("../controllers/userControllers");

router.post("/register", registerUser);

module.exports = router;
