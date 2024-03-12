const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema(
  {
    points: {
      type: Number,
      required: true,
    },
    datetime: {
      type: Date,
      default: Date.now,
    },

    givenBy_userID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    givenTo_UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reward", rewardSchema);
