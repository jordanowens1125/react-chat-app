const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  title: { type: String },
  coverURL: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Chat", ChatSchema);
