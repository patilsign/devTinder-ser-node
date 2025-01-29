require("dotenv").config();
const { connectDB } = require("./config/database");
const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require("./models/users");

const app = express();

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");

const customCorsOptions = {
  origin: "http://localhost:5173",
  credentails: true,
};

app.use(cors(customCorsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

app.post("/sendConnection", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(
      user.firstName + " " + user.lastName + " -- sent connection request"
    );
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established.....");
  })
  .catch((err) => {
    console.log("connection failed");
  });

app.listen(process.env.PORT, () => {
  console.log("Server is listening an port 3000........", process.env.PORT);
});
