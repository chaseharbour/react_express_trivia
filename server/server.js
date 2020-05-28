const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 5000;
const router = require("./routes/index");

//Console log user connected on new socket connection
io.on("connection", (socket) => {
  console.log(`A user has connected with ID: ${socket.id}`);

  socket.on("join", ({ userName, room }, callback) => {
    //console.log(`User ${socket.id} joined ${room} with username: ${userName}`);
    const { error, user } = addUser({ id: socket.id, userName, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "Server",
      text: `${user.userName}, welcome to ${user.room}!`,
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "Server",
      text: `${user.userName} has joined the room!`,
    });

    socket.join(user.room);

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Server",
        text: `User ${user.userName} has disconnected`,
      });
    }
    console.log(`User ${socket.id} has disconnected`);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    //console.log(user, message);

    io.to(user.room).emit("message", { user: user.userName, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });
});

app.use(router);

//Start server and console.log success message
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
