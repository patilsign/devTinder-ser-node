const express = require('express');
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");

app.get('/getUserData', (req, res, next) => {
     throw new error("mankind error");
     res.send("user data sent");
});

app.use("/", (err, req, res, next) => {
     if (err) {
          res.status(500).send("Error Handle by route handler");
     }
});

app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});