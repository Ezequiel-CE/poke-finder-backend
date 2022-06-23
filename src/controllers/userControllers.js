const UserModel = require("../models/User");
const { registerValidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");

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

    //hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value.password, salt);

    //create a new user
    const user = new UserModel({
      name: value.name,
      email: value.email,
      password: hashedPassword,
    });

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
