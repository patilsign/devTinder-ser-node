const express = require('express');
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.use("/admin",adminAuth);

app.use("/admin/getAllData", (req, res, next) => {
     console.log("All User Data  rights.....called");
     res.send("All Users Data ");
});

app.use("/admin/delete", (req, res, next) => {
     console.log("User deleted  rights.....called");
     res.send(" Users deleted ");
});

app.use('/', (req, res, next) => {
     console.log("before user called....");
     //res.send("wildcard matches");
     next();
});

app.use('/user', userAuth,(req, res, next) => {
     console.log("in user called....");
     res.send("user matches");
     next();
});

app.use('/userLogin',(req, res, next) => {
     console.log("in userLogin called....");
     res.send("user login no need auth");
     next();
});

app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});