const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
const io = require("socket.io")(http);

const index = require("./routes/index");

app.use(index);

//Start server and console.log success message
http.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//Console log user connected on new socket connection
io.on("connection", (socket) => {
  console.log(`A user has connected with ID: ${socket.id}`);

  socket.on("SEND_MESSAGE", function (data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});

const getApiAndEmit = (socket) => {
  const response = "Test";

  //Emit message to be consumed by client
  socket.emit("FromAPI", response);
};
