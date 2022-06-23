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

  try {
    //verify if the email exists
    const emailExist = await UserModel.findOne({ email: value.email });
    if (emailExist) {
      return res
        .status(200)
        .json({ success: false, message: "user already exists" });
    }

    //create a new user
    const user = new UserModel(value);

    //save user in database
    const savedUser = await user.save();

    res
      .status(200)
      .json({ success: true, message: "user created", data: savedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser };
