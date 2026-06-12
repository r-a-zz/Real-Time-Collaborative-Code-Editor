const io = require('socket.io-client');

const socket = io('http://localhost:3000');

socket.on('connect', () => {

    console.log('Connected to the server');

    // Join room
    socket.emit('join-room', 'room1');


    // Send a message after joining
    socket.emit('message', {
        room: 'room1',
        msg: 'Hello from test client!'
    });


    // Leave the room after 5 seconds
    setTimeout(() => {

        socket.emit('leave-room', 'room1');

    }, 5000);
});


// Receive messages from others
socket.on('message', (msg) => {

    console.log('Received message:', msg);

});


// Someone joined the room
socket.on('user-joined', (msg) => {

    console.log(msg);

});


// Someone left the room
socket.on('user-left', (msg) => {

    console.log(msg);

});


socket.on('disconnect', () => {

    console.log('Disconnected from the server');

});