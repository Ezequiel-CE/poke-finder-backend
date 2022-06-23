const Joi = require("joi");

module.exports = Joi.object({
  name: Joi.string().min(5).max(200).required(),
  email: Joi.string().min(5).max(200).required().email(),
  password: Joi.string().min(5).max(1024).required(),
});
