const jwt = require('jsonwebtoken');
const  User  = require('../models/users');

const adminAuth = (req, res, next) => {
     console.log("admin rights.....called");
     const user = "admin"
     if (user === "admin") {
          next();
     }
     else {
          res.status(401).send("Unauthrised user");
     }
}

const userAuth = async (req, res, next) => {
     const cookies = req.cookies;
     const { token } = cookies
     console.log(token);
     try {
          const decodeToken = await jwt.verify(token, 'sign@3575');
          console.log(decodeToken,"decode token user AUth");
          const user = await User.findOne({ _id: decodeToken._id });
          console.log(user, "user in userAuth")
          req.user = user;
          next();
     } catch (err) {
          res.status(404).send("User Auth Failed");
     }
}
module.exports = { adminAuth, userAuth }