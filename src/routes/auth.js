const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { adminAuth, userAuth } = require("../middlewares/auth");
const User = require('../models/users');
const { validateData } = require('../utils/validations');

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
     const { email, password } = req.body;
     try {
          if (!email || !password) {
               throw new Error("Enter Credentials for Login")
          } else {
               const user = await User.findOne({ email });
               if (!user) {
                    throw new Error("Invalid Credentils");
               }
               const passwordMatch = await user.verifyPassword(password);
               if (!passwordMatch) {
                    throw new Error("Invalid Credentials");
               } else {
                    const token = await user.getJWT();
                    res.cookie("token", token);
                    res.send("User Login Successful");
               }
          }
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
});

authRouter.post('/signup', async (req, res, next) => {
     const { firstName, lastName, email, password } = req.body;
     try {
          validateData(req.body);
          const passwordHash = await bcrypt.hash(req.body.password, 10);
          const user = new User({
               firstName,
               lastName,
               email,
               password: passwordHash
          });
          await user.save();
          res.send("user added successfully");
     } catch (err) {
          res.status(400).send("ERROR :" + err.message);
     }
});

authRouter.post('/logout', async (req, res) => {
     res.cookie("token", null, { expires: new Date(Date.now()) });
     res.send("User logged out.");
})

module.exports = authRouter 