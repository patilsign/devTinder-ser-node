const bcrypt = require('bcrypt');

const validator = require('validator');

const validateData = (req) => {
     if (!validator.isEmail(req.email)) {
          throw new Error("Email Id is Invalid.. Explicit Validations");
     }
     if (!validator.isStrongPassword(req.password)) {
          throw new Error("Password Must be Strong.. Explicit Validations");
     }
}

const isFieldsAllowedToUpdate = (req) => {
     const ALLOW_FIELDS = ['firstName', 'lastName', 'gender', 'about', 'photoUrl', 'skills'];
     const check = function (item) {
          return ALLOW_FIELDS.includes(item);
     };
     const validateFields = Object.keys(req).every(check);

     if (!validateFields) {
          throw new Error("Fields not allowed to update");
     }
     return req.user
}

module.exports = { validateData, isFieldsAllowedToUpdate }