const router = require("express").Router();
const UserModel = require("../models/User");

router.get("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new UserModel({ name, email, password });

    const savedUser = await user.save();

    res.status(200).send(savedUser);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

module.exports = router;
