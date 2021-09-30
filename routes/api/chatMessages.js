const { Router } = require("express");
const ChatMessage = require("../../models/ChatMessage");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const ChatMessages = await ChatMessage.find();
    if (!ChatMessages) throw new Error("No messages found ");
    res.status(200).json(ChatMessages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newChatMessage = new ChatMessage(req.body);
  console.log(newChatMessage);
  try {
    const ChatMessage = await newChatMessage.save();
    if (!ChatMessage)
      throw new Error("Something went wrong saving the chat message ");
    res.status(200).json(ChatMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await ChatMessage.findByIdAndUpdate(id, req.body);
    if (!response) throw Error("Something went wrong ");
    const updated = { ...response._doc, ...req.body };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await ChatMessage.findByIdAndDelete(id);

    if (!removed) throw Error("Something went wrong ");

    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
