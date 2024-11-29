const express = require('express');
const app = express();
const { connectDB } = require("./config/database");
const { adminAuth, userAuth } = require("./middlewares/auth");
const user = require('./models/users');
const User = require('./models/users');


console.log(user, "exported user");
app.use(express.json());

app.post('/signup', async (req, res, next) => {
     const user = new User(req.body);
     try {
          await user.save();
          res.send("user added successfully");
     } catch (err) {
          res.status(400).send("failed to save data", err.message);
     }
});

app.get('/user', async (req, res) => {
     const userEmail = req.body.email;
     try {
          console.log(userEmail)
          const userData = await user.findOne({ email: userEmail });
          console.log(userEmail, userData);
          if (!userData) {
               res.status(404).send("user not found", err.message);
          } else {
               res.send(userData);
          }
     } catch (err) {
          res.status(404).send("Something went wrong", err.message);
     }
}
)

app.get('/users', async (req, res) => {
     const userEmail = req.body.email;
     try {
          console.log(userEmail)
          const userData = await user.find({});
          console.log(userEmail, userData);
          if (userData.length === 0) {
               res.status(404).send("user not found", err.message);
          } else {
               res.send(userData);
          }
     } catch (err) {
          res.status(404).send("Something went wrong", err.message);
     }
}
)

connectDB()
     .then(() => {
          console.log("Database Connection Established.....")
     }).catch((err) => {
          console.log("connection failed");
     });

app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});