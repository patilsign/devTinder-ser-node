const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const { ConnectionRequest } = require('../models/connections');

const { adminAuth, userAuth } = require("../middlewares/auth");
const { validateData } = require('../utils/validations');

const USER_PUBLIC_DATA = "firstName lastName gender age photoUrl about"

const userRouter = express.Router();

userRouter.post('/sendConnectionRequest/:status/:toUserId', userAuth, async (req, res) => {
     const loggedInUser = req.user;
     try {
          const fromUserId = loggedInUser._id;
          const toUserId = req.params.toUserId;
          const status = req.params.status;

          const statusCheck = ["interested", "ignored"];
          console.log(fromUserId, "-11111");
          console.log(toUserId, "-222222");

          if (!statusCheck.includes(status)) {
               return res.json({ message: "Please send valid Status" });
          };

          if (fromUserId.equals(toUserId)) {
               return res.json({ message: "User can't send connection to himself" });
          };

          const toUser = await User.findOne({ _id: toUserId });
          if (!toUser) {
               return res.json({ message: "Sent User is not Present" });
          };

          const existingConnectionRequest = await ConnectionRequest.findOne({
               $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
               ]
          });
          if (existingConnectionRequest) {
               console.log(existingConnectionRequest, "checking existing connections -333333");
               return res.json({ "message": "Connection is Already Exists" });
          }
          const connection = new ConnectionRequest({
               fromUserId, toUserId, status
          });
          const data = await connection.save();
          res.json({ message: "sent connection successfully", data: data });

     } catch (err) {
          res.status(404).send("ERROR :" + err.message);
     }
}
);

userRouter.post('/replyConnectionRequest/:status/:toUserId', userAuth, async (req, res) => {
     try {
          const loggedUser = req.user;

          const requestId = req.params.toUserId
          const status = req.params.status

          const connectionRequest = await ConnectionRequest.findOne({
               _id: requestId,
               toUserId: loggedUser._id,
               status: "interested"
          });
          console.log(connectionRequest, "2222");
          if (!connectionRequest) {
               return res
                    .status(400)
                    .json({ "message": "Connection is Already Exists" });
          }
          connectionRequest.status = status;
          console.log(connectionRequest, "2222  nextttttttt");
          const data = await connectionRequest.save();
          res.json({ message: "Connection Accepted successfully", data: data });

     } catch (err) {
          await res.status(404).send("Not Valid user Connection" + err)
     }
});

userRouter.get('/user/request/received', userAuth, async (req, res) => {
     try {
          const loggedUser = req.user;
          const connectionRequest = await ConnectionRequest.find({
               toUserId: loggedUser._id,
               status: "interested"
          }).populate("fromUserId", USER_PUBLIC_DATA);

          console.log(connectionRequest, "11111111111");

          res.json({ message: "Received Connection Requests", data: connectionRequest });
     } catch (err) {
          await res.status(404).send("Not Valid user Connection" + err)
     }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
     try {
          const loggedUser = req.user;
          const connectionRequest = await ConnectionRequest.find({
               $or: [
                    { toUserId: loggedUser._id, status: "accepted" },
                    { fromUserId: loggedUser._id, status: "accepted" }
               ]
          })
               .populate("fromUserId", USER_PUBLIC_DATA)
               .populate("toUserId", USER_PUBLIC_DATA);

          console.log(connectionRequest, "connections");

          const data = connectionRequest.map((row) => {
               if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
                    return row.toUserId
               }
               return row.fromUserId
          });
          res.json({ message: "Accepted Connection.", data: data });
     } catch (err) {
          await res.status(404).send("Fetched Connections" + err)
     }
});

module.exports = userRouter