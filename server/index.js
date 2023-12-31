const express = require("express");
const http = require("http");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config({ path: "./config/.env" });
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
connectDB();

const app = express();
const server = http.createServer(app);

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getChatUsers,
} = require("./utils/users");

const formatMessage = require("./utils/messages");
const Message = require("./models/message");
const User = require("./models/user");
const Chat = require("./models/chat");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const botName = {
  name: "ChatCord Bot",
  photoURL:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/chats", require("./routes/chats"));

// Run when a connection happens
io.on("connection", (socket) => {
  // Listen for room join
  socket.on("joinChat", ({ user, chat }) => {
    const member = userJoin(socket.id, user, chat);
    socket.join(member.chat);

    io.to(member.chat).emit("chatUsers", {
      chat: member.chat,
      users: getChatUsers(member.chat),
    });
  });

  // Listen for chat message
  socket.on("newMessage", async (msg) => {
    const member = getCurrentUser(socket.id);
    if (member) {
      console.log(member);
      io.to(member.chat).emit("message", formatMessage(member.user, msg));
      const message = await Message.create({
        text: msg,
        date: new Date(),
        chat: member.chat,
        creator: member.user._id,
      });

      await User.findByIdAndUpdate(member.user._id, {
        $push: {
          messages: message._id,
        },
      });

      await Chat.findByIdAndUpdate(member.chat, {
        $push: {
          messages: message._id,
        },
      });
    }
  });

  socket.on("disconnect", () => {
    const member = userLeave(socket.id);
    if (member) {
      // io.to(member.chat).emit(
      //   "message",
      //   formatMessage(botName, `${member?.name || "idk"} has left the chat!`)
      // );
      io.to(member.chat).emit("chatUsers", {
        chat: member.chat,
        users: getChatUsers(member.chat),
      });
    }
  });
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
