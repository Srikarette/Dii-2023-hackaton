const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("../data/data");

const app = express();
dotenv.config();

app.get("/api/chat", (req, res) => {
  res.json(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((c) => c._id === req.params.id);
  if (singleChat) {
    res.json(singleChat);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
