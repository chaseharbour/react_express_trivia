const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const axios = require("axios");

const PORT = process.env.PORT || 5000;
const router = require("./routes/index");

let apiData;

axios
  .get("https://opentdb.com/api.php?amount=2&category=23")
  .then((res) => (apiData = res.data.results))
  .catch((error) => console.log(error));

//Console log user connected on new socket connection
io.on("connection", (socket) => {
  console.log(`A user has connected with ID: ${socket.id}`);
  console.log(apiData.map((q) => q.question));

  socket.on("join", ({ userName, room }, callback) => {
    //console.log(`User ${socket.id} joined ${room} with username: ${userName}`);
    const { error, user } = addUser({ id: socket.id, userName, room });

    if (error) return callback(error);

    //Places client into the room they chose
    socket.join(user.room);

    //User 'Server' issues a welcome message to the user that joins
    socket.emit("message", {
      user: "Server",
      text: `${user.userName}, welcome to ${user.room}!`,
    });

    //User 'Server' issues a notice to all users that a new user connected
    socket.broadcast.to(user.room).emit("message", {
      user: "Server",
      text: `${user.userName} has joined the room!`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    //Send API data to Trivia component
    io.to(user.room).emit("questionData", {
      room: user.room,
      questions: apiData.map((q) => q.question),
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
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log(`User ${socket.id} has disconnected`);
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    //console.log(user, message);

    io.to(user.room).emit("message", { user: user.userName, text: message });

    callback();
  });
});

app.use(router);

//Start server and console.log success message
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
