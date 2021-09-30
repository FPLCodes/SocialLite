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
  code: {
    type: String,
    required: true,
  },
});

const ChatMessage = model("chatMessage", MessageSchema);

module.exports = ChatMessage;
