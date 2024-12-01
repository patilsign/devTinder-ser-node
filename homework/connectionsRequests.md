const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const ConnectionRequestModel = require('../models/connections');

const { adminAuth, userAuth } = require("../middlewares/auth");
const { validateData } = require('../utils/validations');

const userRouter = express.Router();

userRouter.post('/sendConnectionRequest/:status/:toUserId', userAuth, async (req, res) => {
     const loggedInUser = req.user;
     try {
          const fromUserId = loggedInUser._id;
          const toUserId = req.params.toUserId;
          const status = req.params.status;

          const statusCheck = ["interested", "ignored"];

          if (!statusCheck.includes(status)) {
               return res.json({ "message": "sent status is not accepted" });
          }
          if (fromUserId.equals(toUserId)) {
               return res.json({ "message": "User can't send connection to himself" });
          }
          const toUser = await User.findOne({ _id: toUserId });
          if (!toUser) {
               return res.json({ "message": "Sent User is not Present" });
          }
          const existingConnectionRequest = await ConnectionRequestModel.findOne({
               $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
               ]
          });
          if(existingConnectionRequest){
               return res.json({ "message": "Connection is Already Exists" });
          }
          const targetUser = await ConnectionRequestModel.findOne({ toUserId });
          if (targetUser) {
               return res.json({ "message": "Connection is Already Exists" });
          };
          const connection = new ConnectionRequestModel({
               fromUserId, toUserId, status
          });
          await connection.save();
          res.json({ message: "sent connection successfully", connection });

     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
)
module.exports = userRouter