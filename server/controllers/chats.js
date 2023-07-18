const { default: mongoose } = require("mongoose");
const Chat = require("../models/chat");
const User = require("../models/user");
const Message = require("../models/message")

const createChat = async (req, res) => {
  console.log(req.body);
  try {
    const chat = await Chat.create(req.body);
    await User.updateMany(
      {
        _id: { $in: req.body.members },
      },
      {
        $push: {
          chats: chat._id,
        },
      }
    );

    await User.findByIdAndUpdate(req.body.creator, {
      $push: {
        createdChats: chat._id,
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const getChats = async (req, res) => {
  const id = req.params.id;
  try {
    const chats = await User.findById(id).populate([
      {
        path: "chats",
        populate: [{ path: "messages", populate: [{ path: "creator" }] }],
      },{
        path: "createdChats",
        populate: [{ path: "messages", populate: [{ path: "creator" }] }],
      },
    ]);
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createChat,
  getChats,
};
