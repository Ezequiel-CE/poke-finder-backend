const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

//routes
const authRoutes = require("./src/routes/auth");
const apiRoutes = require("./src/routes/api");

const app = express();

//connect db

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("connected db");
});

//middleware
app.use(express.json());
app.use(cors());

//session middleware
app.use(
  session({
    secret: "session secret",
    resave: false,
    saveUninitialized: true,
  })
);

//passport athentication
app.use(passport.initialize());
app.use(passport.session());
require("./src/config/passport");

// app.use((req, res, next) => {
//   console.log(req.session);

//   next();
// });

//routes
app.use("/api/auth", authRoutes);
app.use("/api", apiRoutes);

app.listen(5000, () => console.log("corriendo en port 5000"));
