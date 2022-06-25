const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");

//agregan user al req
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//local strategy

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new LocalStrategy(customFields, async function (username, password, done) {
    try {
      //check the user
      const user = await UserModel.findOne({ email: username });

      if (!user) {
        return done(null, false);
      }
      //check if the password is correct
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        //take the js object | moongose send more api in the response
        const { _doc, ...rest } = user;
        //delete password
        delete _doc.password;

        return done(null, _doc);
      } else {
        return done(null, false); //envia status code 401
      }
    } catch (error) {
      return done(error); //envia status code 401
    }
  })
);

//JWT STRATEGY

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
      try {
        done(null, payload);
      } catch (error) {
        done(error);
      }
    }
  )
);
