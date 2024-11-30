const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          minlength: 5,
          required: true,
     },
     lastName: {
          type: String,
          minlength: 5
     },
     email: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true,
          validate(value) {
               if (!validator.isEmail(value)) {
                    throw new Error("Enter the valid email Id");
               }
          }
     },
     password: {
          required: true,
          type: String,
     },
     age: {
          type: Number,
          min: 18
     },
     gender: {
          type: String,
          validate(value) {
               if (!["male", "female", "other"].includes(value)) {
                    throw new Error("Gender not valid")
               }
          }
     },
     photoUrl: {
          type: String,
          default: "hbfsdbfn.fhsdbfs.fsdfsd"
     },
     skills: {
          type: [String],
     },
     about: {
          type: String,
          default: "User is having social media interest"
     }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;