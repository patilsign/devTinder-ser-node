const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { adminAuth, userAuth } = require("../middlewares/auth");
const User = require("../models/users");
const { isFieldsAllowedToUpdate } = require("../utils/validations");

const profileRouter = express.Router();

console.log("auth login called");

profileRouter.post("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ message: "Reading Cookie, Logged In User is : :", data: user });
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ message: "Logged In User :", data: user });
  } catch (err) {
    if (res.status === 401) {
      res.status(401).send({ message: "Unauthorised User : Please Login", statusCode: res.status });
    }
    res.status(401).send("ERROR :" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  const data = req.body;
  const loogedInUser = req.user;
  try {
    isFieldsAllowedToUpdate(data);
    Object.keys(data).forEach((key) => {
      loogedInUser[key] = data[key];
    });
    loogedInUser.save();
    res.json({ message: "User Updated Successfully.", data: loogedInUser });
  } catch (err) {
    res.status(404).send("ERROR :" + err.message);
  }
});

module.exports = profileRouter;
