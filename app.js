const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

//routes
const authRouter = require("./src/routes/auth");

const app = express();

//connect db

const connection = mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("connected db");
});

//middleware
app.use(express.json());

//session middleware
app.use(
  session({
    secret: "secret password",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

//passport athentication
require("./src/config/passport");
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/api/auth", authRouter);

app.listen(5000, () => console.log("corriendo en port 5000"));
