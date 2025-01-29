URL = process.env.DATABASE_CONNECTION_STRING;

const mongoose = require("mongoose");

const connectDB = async () => {
          console.log(URL,"connection string")
     await mongoose.connect(URL);
};

module.exports = { connectDB }
