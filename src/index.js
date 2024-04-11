import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { createServer } from "http"
import { Server } from "socket.io"
import majorRoute from "./routes/majorRoute.js"
import subjectRoute from "./routes/subjectRoute.js"
import userRoute from "./routes/userRoute.js"
import accountRoute from "./routes/accountRoute.js"
import conversationRoute from"./routes/conversationRoute.js"
import messageRoute from"./routes/messageRoute.js"
import inviteRoute from "./routes/invitationRoute.js"
import friendRoute from "./routes/friendRoute.js"
import roomRoute from "./routes/roomRoute.js"
import cors from "cors"

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"]
  }
});

// Middleware for parsing request body
app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  // console.log(request);
  return response.status(234).send("This is API of StuTo App - belongs to ThangDev03");
});

app.use("/major", majorRoute);
app.use("/subject", subjectRoute);
app.use("/user", userRoute);
app.use("/account", accountRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);
app.use("/invitation", inviteRoute);
app.use("/friend", friendRoute);
app.use("/room", roomRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

let users = [];
const roomUsers = {};
const socketToRoom = {};

// Check if user exist in users
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
}

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

io.on("connection", (socket) => {
  // console.log("An user connected");

  //Get userId and socketId from users
  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  })

  //Send and get messages
  socket.on("sendMessage", ({senderId, receiverId, text}) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text
    })
  })

  //Join room (limit 4 roomUsers)
  socket.on("join room", roomId => {
    if (roomUsers[roomId]) {
      const length = roomUsers[roomId].length;
      if (length === 4) {
        socket.emit("Room full");
        return;
      }
      roomUsers[roomId].push(socket.id);
    } else {
      roomUsers[roomId] = [socket.id];
    }
    socketToRoom[socket.id] = roomId;
    const usersInThisRoom = roomUsers[roomId].filter(id => id !== socket.id);

    socket.emit("all users", usersInThisRoom)
  })

  //Start joining room
  socket.on("sending signal", payload => {
    io.to(payload.userToSignal).emit('user joined', {signal: payload.signal, callerId: payload.callerId})
  })
  
  socket.on("returning signal", payload => {
    io.to(payload.callerId).emit('receiving returned signal', {signal: payload.signal, id: socket.id})
  })

  //User disconnect
  socket.on("disconnect", () => {
    // console.log("An user disconnected!!");
    const roomId = socketToRoom[socket.id];
    let room = roomUsers[roomId];
    if (room) {
      room = room.filter(id => id !== socket.id);
      roomUsers[roomId] = room;
    }

    removeUser(socket.id)
    io.emit("getUsers", users);
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});