const router = require("express").Router();

router.get("/cards", (req, res) => {
  res.send("cartas protegidas");
});

module.exports = router;
