const jwt = require('jsonwebtoken');
const  User  = require('../models/users');

const adminAuth = (req, res, next) => {
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
     try {
          const decodeToken = await jwt.verify(token, 'sign@3575');
          const user = await User.findOne({ _id: decodeToken._id });
          req.user = user;
          next();
     } catch (err) {
          res.status(404).send("User Auth Failed");
     }
}
module.exports = { adminAuth, userAuth }