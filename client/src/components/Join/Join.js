import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './Join.css';

const Join = () => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='joinOuterContainer'>
            <div className="joinInnerContainer">
                <h1 className="heading">Join or Create Room</h1>
                <div>
                    <input type="text" placeholder="UserName" className="joinInput" onChange={(event) => setName(event.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Room" className="joinInput mt-20" onChange={(event) => setRoom(event.target.value)} />
                </div>
                <Link to={`/chat?name=${name}&room=${room}`} onClick={event => (!name || !room) ? event.preventDefault() : null} >
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>    
        </div>
    );
}

export default Join;
