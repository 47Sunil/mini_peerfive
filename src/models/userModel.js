const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      require: true,
    },
    ID: {
      type: String,
      required: true,
    },
    P5_balance: {
      type: Number,
      default: 100,
    },
    Rewards_balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
