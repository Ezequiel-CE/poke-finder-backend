const UserModel = require("../models/User");
const { registerValidation } = require("../utils/validation");

const registerUser = async (req, res) => {
  //validation
  const { error, value } = registerValidation(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  //create a new user
  const user = new UserModel(value);

  try {
    //save user in database
    const savedUser = await user.save();

    res.status(200).send(savedUser);
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser };
