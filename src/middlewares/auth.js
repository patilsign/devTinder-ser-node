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

const userAuth = (req, res, next) => {
     console.log("user rights.....called");
     const user = "user2"
     if (user === "user") {
          next();
     }
     else {
          res.status(401).send("Unauthrised user");
     }
}

module.exports = { adminAuth, userAuth }