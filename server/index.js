const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser,removeUser, getUser, getUsersInRoom} = require('./users');

const app = express();
const router = require('./router');
app.use(router);
// initializing the server
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('Connection Established');

    socket.on('join', ({name, room}, callback) => {
        // console.log(name, room);

        // adding a user to room when he joins
        const {error, user} = addUser({id: socket.id, name, room});
        if(error) {                 // if some error occurs, callback from frontend is called with error
            return callback(error);
        }

        // emit is used when we want to emit a event from backend to frontend
        // .on() is used when we expect a event on backend

        // Invite message to user when he joins: received by user who joins
        socket.emit('messsage', {
            user: 'admin',
            text: `Hello ${user.name}! Welcome to the room ${user.room}`
        });

        // sent to all users other than the user who joins
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} has joined !`
        });

        socket.join(user.room);
        callback();     // calling the frontend callback when no error
        
    });

    // user sent msgs to the room
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', {
            user: user.name, 
            text: message
        });

        callback(); // calling the frontend callback when no error
    })

    socket.on('disconnect', () => {
        console.log('Connection Cancelled');
    });
});

const PORT = process.env.PORT || 3005;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
