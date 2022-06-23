const userSchema = require("../schema/userSchema");

const registerValidation = (data) => {
  return userSchema.validate(data);
};

module.exports = { registerValidation };
