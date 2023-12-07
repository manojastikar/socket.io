const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});

io.on("connection", (socket) => {
    console.log(`a user is connected ${socket.id}`);

    socket.on("send_message", (data) => {
        data.message = "Namaste from Branch HEADER" + data.message;
        socket.broadcast.emit("receive_message", data);
    });
});

server.listen(4000, () => { console.log("listening by Manoj's server on port 4000") });