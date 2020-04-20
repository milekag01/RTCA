import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';

let socket;

const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room ,setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);    // location comes from react-router. it gives us the URL
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
    })
    return (
        <div>
            Chat Page
        </div>
    );
}

export default Chat;
