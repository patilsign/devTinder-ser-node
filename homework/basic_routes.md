const express = require('express');

const app = express();

// app.use("/test", (req, res) => {
//      res.send("Test From Express Js Server...........");
// });

// app.use("/hello", (req, res) => {
//      res.send("Hello From Express Js Server...........");
// });

// app.use("/", (req, res) => {
//      res.send("Dashboard  From Express Js Server");
// });

app.get('/', (req, res) => {
     res.send("first get call from express");
});

const userData = { firstname: 'Santosh', lastname: 'patil' }
app.get('/user', (req, res) => {
     res.send(userData);
});

app.post('/user', (req, res) => {
     res.send("Data saved successfully");
});


app.listen(3000, () => {
     console.log("Server is listening an port 3000........");
});