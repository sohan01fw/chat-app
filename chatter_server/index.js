const express = require("express");
const app = express();
const router = require("./routes/userRoute");
const Msgrouter = require("./routes/messageRoute");
const socket = require("socket.io");
require("dotenv").config();
require("./db/Connectdb");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(router);
app.use(Msgrouter);
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`App is listeninig at ${port}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
