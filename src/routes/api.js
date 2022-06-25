const router = require("express").Router();
const passport = require("passport");

router.get("/cards", passport.authenticate("jwt"), (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "podes ver tus cartas protegidas ",
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "no autorizado" });
  }
});

module.exports = router;
