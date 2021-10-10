const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  senderPhoto: {
    type: String,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  receiverID: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
});

const ChatMessage = model("chatMessage", MessageSchema);

module.exports = ChatMessage;
