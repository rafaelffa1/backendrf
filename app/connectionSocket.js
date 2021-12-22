var express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('searchChallenge', msg => { io.emit('searchChallenge', msg); });
    socket.on('notificationChallenge', msg => { io.emit('notificationChallenge', msg); });
    socket.on('refusedChallenge', msg => { io.emit('refusedChallenge', msg); });
    console.log('Ok');
});

module.exports = io;