const express = require('express');

const app = express();

app.use("/", (req, res) => {
     res.send("Dashboard  From Express Js Server");
});

app.use("/test", (req, res) => {
     res.send("Test From Express Js Server...........");
});

app.use("/hello", (req, res) => {
     res.send("Hello From Express Js Server...........");
});

app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});