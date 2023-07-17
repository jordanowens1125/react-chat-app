const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getChatUsers,
} = require("./utils/users");

const formatMessage = require("./utils/messages");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const botName = "ChatCord Bot";

app.use(cors());
// Run when a connection happens
io.on("connection", (socket) => {
  // Listen for room join
  socket.on("joinChat", ({ name, chat }) => {
    const user = userJoin(socket.id, name, chat);
    socket.join(user.chat);
    // To other users who are already connected
    socket.broadcast
      .to(user.chat)
      .emit(
        "message",
        formatMessage(botName, `${user.name} has joined the chat!`)
      );

    io.to(user.chat).emit("chatUsers", {
      chat: user.chat,
      users: getChatUsers(user.chat),
    });
  });

  // Listen for chat message
  socket.on("newMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      io.emit("message", formatMessage(user?.name, msg));
    }
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.chat).emit(
        "message",
        formatMessage(botName, `${user?.name || "idk"} has left the chat!`)
      );
      io.to(user.chat).emit("chatUsers", {
        chat: user.chat,
        users: getChatUsers(user.chat),
      });
    }
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
