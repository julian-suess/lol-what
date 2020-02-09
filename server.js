const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(8080);
// WARNING: app.listen(80) will NOT work here!

app.use(express.static(__dirname + "/dist"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function(socket) {
    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on("mouse", function(data) {
      // Data comes in as whatever was sent, including objects
      console.log("Received: 'mouse' " + data.x + " " + data.y);

      // Send it to all other clients
      socket.broadcast.emit("mouse", data);

      // This is a way to send to everyone including sender
      // io.sockets.emit('message', "this goes to everyone");
    });

    socket.on("disconnect", function() {
      console.log("Client has disconnected");
    });
  }
);
