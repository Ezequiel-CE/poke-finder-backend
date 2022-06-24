const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(customFields, async function (username, password, done) {
    try {
      //check the user
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        return done(null, false);
      }
      //check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
