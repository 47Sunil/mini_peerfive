const userModel = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    let userData = req.body;

    let newUserData = await userModel.create(userData);
    console.log(newUserData);
    return res.status(201).json({
      success: true,
      data: newUserData,
      msg: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message });
  }
};

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const updatedUserData = req.body;
    const { Name, Id } = updatedUserData;

    const savedObj = {};
    if (Name) savedObj.Name = Name;
    if (Id) savedObj.Id = Id;

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: savedObj },
      { new: true }
    );
    if (updatedUser) {
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
