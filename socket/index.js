let server = {
  cors: {
    origin: "http://localhost:8080",
  },
};
if (process.env.NODE_ENV === "production")
  server = {
    cors: {
      origin: "https://social-lite-app.herokuapp.com",
    },
  };

const io = require("socket.io")(8900, server);

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

  socket.on(
    "sendMessage",
    ({ message, sender, senderPhoto, senderID, receiverID, time }) => {
      const user = getUser(receiverID);
      io.to(user.socketId).emit("getMessage", {
        message,
        sender,
        senderPhoto,
        senderID,
        receiverID,
        time,
      });
    }
  );

  socket.on("disconnect", () => {
    console.log("A user has disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
