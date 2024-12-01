const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
     fromUserId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
     },
     toUserId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true
     },
     status: {
          type: String,
          required: true,
          enum: {
               values: ["interested", "ignored", "accepted", "rejected"],
               message: `{ VALUE } is incorrect status type`
          }
     }
},
     {
          timestamps: true
     });

connectionSchema.index({ fromUserId: 1, toUserId: 1 });

const ConnectionRequestModel = new mongoose.model("Connection Request", connectionSchema);

module.exports = ConnectionRequestModel