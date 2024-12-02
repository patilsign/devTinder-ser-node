const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          minlength: 4,
          required: true,
     },
     lastName: {
          type: String,
          minlength: 3
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

userSchema.methods.getJWT = async function () {
     const user = this;
     const token = await jwt.sign({ _id: user._id }, "sign@3575", { expiresIn: "1d" });
     return token;
};

userSchema.methods.verifyPassword = async function(inputPassByUser){
     const user = this;
     console.log(user,inputPassByUser);
     const passwordMatch = await bcrypt.compare(inputPassByUser, user.password);
     return passwordMatch;
};

const User = mongoose.model('User', userSchema);

module.exports = User;