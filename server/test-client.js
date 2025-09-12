const io = require ('socket.io-client'); // Importing the Socket.IO client library.
const socket = io('http://localhost:3000'); // Connecting to the Socket.IO server at localhost:3000.


socket.on('connect', () => {
    console.log('Connected to the server'); // Log when connected to the server.
    socket.emit('join-room', 'test-room'); // Join a room named 'test-room'. 
    socket.emit('message', 'Hello from test client!'); // Send a message to the room.
    setTimeout(() => {
        socket.emit('leave-room', 'test-room'); // Leave the room after 5 seconds.
    }, 5000);
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from the server'); // Log when disconnected from the server.
});

