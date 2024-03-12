const userModel = require("../models/userModel");
const rewardModel = require("../models/rewardModel");

exports.transaction = async (req, res) => {
  try {
    const { givenBy, givenTo, points } = req.body;

    const givenByUser = await userModel.findOne({
      ID: givenBy,
    });
    const givenToUser = await userModel.findOne({
      ID: givenTo,
    });

    if (!givenByUser || !givenToUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (points <= 0 || points > 100) {
      return res.status(400).json({ message: "Invalid P5 points" });
    }

    if (givenByUser.P5_balance < points) {
      return res.status(400).json({ message: "Insufficient P5 balance" });
    }

    givenByUser.P5_balance -= points;
    givenToUser.Rewards_balance += points;
    await givenByUser.save();
    await givenToUser.save();

    const transaction = await rewardModel.create({
      points,
      givenBy: givenByUser.ID,
      givenTo: givenToUser.ID,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction Successfull.",
      givenBy,
      givenTo,
      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// exports.deleteTransaction = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const transaction = await rewardModel.findById(id);
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     const givenByUser = await userModel.findOne(transaction.givenBy);
//     const givenToUser = await userModel.findOne(transaction.givenTo);

//     givenByUser.P5_balance += transaction.points;
//     givenToUser.Rewards_balance -= transaction.points;

//     // Update user balances
//     await givenByUser.save();
//     await givenToUser.save();

//     await transaction.remove();

//     return res
//       .status(200)
//       .json({ success: true, message: "Transaction deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.getTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    const transaction = await rewardModel.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction Fetched Successfull.",

      transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRewartPoints = async (req, res) => {
  try {
    const { ID } = req.body; // user ID
    const user = await userModel.findOne({
      ID: ID,
    });
    const rewardPoints = user.Rewards_balance;
    return res.status(200).json({
      success: true,
      message: "Total reward points recieved.",
      rewardPoints,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
