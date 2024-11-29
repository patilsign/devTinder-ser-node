const express = require('express');
const { connectDB } = require("./config/database");
const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require('./models/users');

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
          const userData = await User.findOne({ email: userEmail });
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

app.get('/feed', async (req, res) => {
     const userEmail = req.body.email;
     try {
          console.log(userEmail)
          const userData = await User.find({});
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

app.delete('/userDelete', async (req, res) => {
     const userId = req.body.userId;
     try {
          //const userData = await User.findByIdAndDelete({userId});
          await User.findByIdAndDelete({ _id: userId });
          if (!userId) {
               res.status(404).send("Please Provide user Id", err.message);
          } else {
               res.send("User delete successfully");
          }
     } catch (err) {
          res.status(404).send("Something went wrong", err.message);
     }
}
)

app.patch('/updateUser', async (req, res) => {
     const data = req.body;
     console.log(data)
     try {
          //const userData = await User.findByIdAndUpdate({userId});
          const returnData = await User.findByIdAndUpdate(data.userId, { data }, [returnDocument = 'after']);
          if (!data.userId) {
               res.status(404).send("Please Provide user Id", err.message);
          } else {
               console.log(returnData)
               res.send("User Updated successfully",);
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