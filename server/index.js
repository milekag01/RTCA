const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const router = require('./router');
app.use(router);
// initializing the server
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Connection Established');

    socket.on('join', ({name, room}) => {
        console.log(name, room);
    })

    socket.on('disconnect', () => {
        console.log('Connection Cancelled');
    });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
