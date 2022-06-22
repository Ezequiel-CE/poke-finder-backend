const express = require("express");

//routes
const authRouter = require("./routes/auth");

const app = express();

app.use("/api/auth", authRouter);

app.listen(5000, () => console.log("corriendo en port 5000"));
