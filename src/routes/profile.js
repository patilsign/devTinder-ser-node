const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { adminAuth, userAuth } = require("../middlewares/auth");
const User = require('../models/users');
const { isFieldsAllowedToUpdate } = require('../utils/validations');

const profileRouter = express.Router();

console.log("auth login called");

profileRouter.post('/profile', userAuth, async (req, res) => {
     try {
          const user = req.user;
          res.send("Reading Cookie, Logged In User is :" + user);
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
);

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
     const data = req.body;
     const loogedInUser = req.user;
     try {
          isFieldsAllowedToUpdate(data);
          Object.keys(data).forEach((key) => {
               loogedInUser[key] = data[key];
          });
          loogedInUser.save();
          res.send("User Updated successfully \n" + loogedInUser);
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
)

module.exports = profileRouter 