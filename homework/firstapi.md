const express = require('express');
const app = express();
const { connectDB } = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const user = require('./models/users');
const User = require('./models/users');

console.log(user, "exported user");

app.post('/signup', async (req, res, next) => {
     const user = new User({
          firstName: "Ved",
          lastName: "Patil",
          email: "ved@patil.com",
          password: "ved@123",
     });
     try {
          await user.save();
          res.send("user added successfully");
     } catch (err) {
          res.status(400).send("failed to save data", err.message);
     }
});


connectDB()
     .then(() => {
          console.log("Database Connection Established.....")
     }).catch((err) => {
          console.log("connection failed");
     });

app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});