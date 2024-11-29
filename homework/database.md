URL = "mongodb+srv://patilsign108:Sasneh%403575.@namastenode.kaygu.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode";

const mongoose = require("mongoose");

const connectDB = async () => {
     await mongoose.connect(URL);
};

module.exports = { connectDB }
