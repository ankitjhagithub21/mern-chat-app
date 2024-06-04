const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const userSocketMap = {};

const getSocketReceiverId = (receiverId) =>{
    return userSocketMap[receiverId]
}


io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    
    for (const [key, value] of Object.entries(userSocketMap)) {
      if (value === socket.id) {
        delete userSocketMap[key];
        break;
      }
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { app,io, server,getSocketReceiverId };
