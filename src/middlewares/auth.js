const jwt = require("jsonwebtoken");
const User = require("../models/users");
const USER_PUBLIC_DATA = "firstName lastName photoUrl about"

const adminAuth = (req, res, next) => {
  const user = "admin";
  if (user === "admin") {
    next();
  } else {
    res.status(401).send("Unauthrised user");
  }
};

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      res.status(401).send("Please Login...");
    }
    const decodeToken = await jwt.verify(token, "sign@3575");
    const user = await User.findOne({ _id: decodeToken._id });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send("User Auth Failed");
  }
};
module.exports = { adminAuth, userAuth };
