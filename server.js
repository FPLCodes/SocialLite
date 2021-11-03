const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { PORT } = require("./config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const UserProfileRoutes = require("./routes/api/userProfiles");
const ChatMessageRoutes = require("./routes/api/chatMessages");
const path = require("path");

let server = {
  cors: {
    origin: "*",
  },
};

const io = require("socket.io")(process.env.PORT || 8900, server);

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");
  socket.on("addUser", (userID) => {
    addUser(userID, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", (receiverID) => {
    const user = getUser(receiverID);
    io.to(user.socketId).emit("getMessage");
  });

  socket.on("disconnect", () => {
    console.log("A user has disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB database Connected..."))
  .catch((err) => console.log(err));

app.use("/api/userProfiles", UserProfileRoutes);
app.use("/api/chatMessages", ChatMessageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
