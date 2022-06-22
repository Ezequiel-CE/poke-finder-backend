const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//routes
const authRouter = require("./routes/auth");

const app = express();

//connect db

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("connected db");
});

//middleware
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(5000, () => console.log("corriendo en port 5000"));
