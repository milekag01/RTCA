import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room ,setRoom] = useState('');
    const [message ,setMessage] = useState('');
    const [messages ,setMessages] = useState([]);

    const ENDPOINT = 'localhost:3005';

    // connection trigger handler
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

    // message handler
    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages]);

    // function to send message
    const sendMessage = (event) => {
        event.preventDefault();
        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(messages, message);
    // console.log(message);

    return (
        <div className="outerContainer">
            <div className="container">
                {/* <input 
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) :null}
                />       */}
                <Infobar room={room} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}

export default Chat;
