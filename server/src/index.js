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
    socket.on('disconnect', () => {
        console.log('Connection Cancelled');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
