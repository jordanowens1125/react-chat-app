const { default: mongoose } = require("mongoose");
const User = require("../models/user");

const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error });
  }
};

module.exports = { getOtherUsers };
