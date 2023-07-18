const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
