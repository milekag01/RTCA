import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
// import './Chat.css';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room ,setRoom] = useState('');
    const ENDPOINT = 'localhost:3005';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);    // location comes from react-router. it gives us the URL
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        console.log(socket);
        console.log(name, room);
        socket.emit('join', {name, room}, () => {
            // callback
        });

        // unmounting
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);

    return (
        <div>
            Chat App
        </div>
    );
}

export default Chat;
