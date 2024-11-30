const bcrypt = require('bcrypt');

const validator = require('validator');

const validateData = (req) => {
     if (!validator.isEmail(req.email)) {
          throw new Error("Email Id is Invalid.. Explicit Validations");
     }

     if(!validator.isStrongPassword(req.password)){
          throw new Error("Password Must be Strong.. Explicit Validations");
     }
}

module.exports = { validateData }