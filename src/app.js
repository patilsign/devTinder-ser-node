
const { connectDB } = require("./config/database");
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const { adminAuth, userAuth } = require("./middlewares/auth");
const User = require('./models/users');
const { validateData } = require('./utils/validations');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res, next) => {
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

app.post("/login", async (req, res) => {
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
})

app.post('/profile', userAuth, async (req, res) => {
     try {
          const user = req.user; res.send("Reading Cookie, Logged In User is :" + user);
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
);

app.post('/sendConnection', userAuth, async (req, res) => {
     try {
          const user = req.user;
          res.send(user.firstName + " " + user.lastName + " -- sent connection request");
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
);

app.get('/user', async (req, res) => {
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

app.get('/feed', async (req, res) => {
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

app.delete('/userDelete', async (req, res) => {
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

app.patch('/updateUser', async (req, res) => {
     const data = req.body;
     try {
          const ALLOW_FIELDS = ['userId', 'firstName', 'lastName', 'about', 'photoUrl', 'skills', 'password'];
          const isEmailAllowed = Object.keys(data).every(checkFields);
          function checkFields(k) {
               return ALLOW_FIELDS.includes(k);
          }
          if (!isEmailAllowed) {
               throw new Error("Fields not allowed to update");
          } else {
               //const returnData = await User.findByIdAndUpdate({userId});
               const returnData = await User.findByIdAndUpdate(data.userId, data,
                    {
                         returnDocument: 'after',
                         runValidators: true
                    });
               if (!data.userId) {
                    res.status(404).send("Please Provide user Id" + err.message);
               } else {
                    res.send("User Updated successfully",);
               }
          }
     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
)

connectDB().then(() => {
     console.log("Database Connection Established.....")
}).catch((err) => {
     console.log("connection failed");
});

app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});