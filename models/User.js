const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 200 },
  email: { type: String, required: true, minLength: 5, maxLength: 200 },
  password: { type: String, required: true, minLength: 5, maxLength: 1024 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
