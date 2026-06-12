// Imports Express and Socket.IO
// Creates an HTTP server
// Sets up Socket.IO server
// Listens on port 3000

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new socketIo(server);

io.on('connection', (socket) => {

    console.log(`User connected: ${socket.id}`);

    // User joins a room
    socket.on('join-room', (room) => {

        socket.join(room);

        console.log(`User ${socket.id} joined room: ${room}`);

        // Notify other users in the room
        socket.to(room).emit(
            'user-joined',
            `A user joined ${room}`
        );
    });


    // Broadcast messages to everyone else in the room
    socket.on('message', ({ room, msg }) => {

        console.log(`Room: ${room}, Message: ${msg}`);

        socket.to(room).emit('message', msg);
    });


    // User leaves a room
    socket.on('leave-room', (room) => {

        socket.leave(room);

        console.log(`User ${socket.id} left room: ${room}`);

        // Notify remaining users
        socket.to(room).emit(
            'user-left',
            'A user has left the room'
        );
    });


    // Client disconnects unexpectedly
    socket.on('disconnect', () => {

        console.log(`User disconnected: ${socket.id}`);

        // Rooms are automatically cleaned up
    });

});


server.listen(3000, () => {

    console.log('Server running on port 3000');

});