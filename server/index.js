// Imports Express and Socket.IO
// Creates an HTTP server
// Sets up CORS for cross-origin requests
// Listens on port 5000

const express = require('express');
const http = require('http');
const socketIo = require('socket.io'); // #socket.io server import

 
const app = express(); //app is passed to createServer to let it know that app handles the routes.
const server = http.createServer(app/*OR callback which reads the request.*/); // #HTTP server creation .
const io = new socketIo(server); // #Socket.IO server creation . io is the instance of the Socket.IO server.


io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for user requesting to join a room
    socket.on('join-room', (data) => {
        socket.join(`${data}`); // Join the room
        socket.on('message', (msg) => {
            socket.to(data).emit('message', msg); // Broadcast the message to other users in the room
        });
        console.log(`User joined room: ${data}`);
    });
    
    // Listen for user requesting to leave a room  
    socket.on('leave-room', (data) => {
        socket.leave(data); // leave the room
        socket.to(data).emit('user-left', 'A user has left the room'); // Notify other users in the room
        console.log(`User left room: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
        // In socket IO rooms are automatically cleaned up when users disconnect.
    });
});

// Server listening at port 3000.
server.listen(3000, () => {
    console.log('Server running on port 3000');
});