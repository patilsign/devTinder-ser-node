const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { adminAuth, userAuth } = require("../middlewares/auth");
const User = require('../models/users');
const { validateData } = require('../utils/validations');

const userRouter = express.Router();
userRouter.get('/user', async (req, res) => {
     const userEmail = req.body.email;
     try {
          const userData = await User.findOne({ email: userEmail });
          if (!userData) {
               res.status(404).send("user not found" + err.message);
          } else {
               res.send(userData);
          }
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
)

userRouter.get('/feed', async (req, res) => {
     const userEmail = req.body.email;
     try {
          const userData = await User.find({});
          if (userData.length === 0) {
               res.status(404).send("user not found" + err.message);
          } else {
               res.send(userData);
          }
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
)

userRouter.delete('/userDelete', async (req, res) => {
     const userId = req.body.userId;
     try {
          //const userData = await User.findByIdAndDelete({userId});
          await User.findByIdAndDelete({ _id: userId });
          if (!userId) {
               res.status(404).send("Please Provide user Id" + err.message);
          } else {
               res.send("User delete successfully");
          }
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
)

module.exports = userRouter