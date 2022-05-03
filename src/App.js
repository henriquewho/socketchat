import React from 'react'
import {useState, useEffect} from 'react'
import io, { Socket } from 'socket.io-client'
import Chat from './components/Chat'

import './scss/App.scss'

function App() {
    
    const [username, setUsername] = useState(''); 
    const [room, setRoom] = useState(''); 
    const [logged, setLogged] = useState(false);

    const joinRoom = e => {
        e.preventDefault(); 
        if (username.length===0 || room.length===0) {
            alert('Name and Room must be informed');
            return; 
        } else if (username.includes(' ') || room.includes(' ')) {
            alert('Name and Room must not have a space'); 
            return; 
        } else {
            console.log('login with ', username, room); 
            setLogged(true); 
        }
    }

    return (
        <div>
            <nav>Socket.io chat</nav>
            {
                (logged===false) ? 
                <div className='main-app'>
                    <div className='login-page'>
                        <div className='login-card'>
                            <form onSubmit={joinRoom}>
                                <input type='text' placeholder='user...'
                                onChange={e=>setUsername(e.target.value)} value={username}></input>
                                <input type='text' placeholder='room...'
                                onChange={e=>setRoom(e.target.value)} value={room}></input>
                                <button onClick={joinRoom}>Join chat</button>
                            </form>
                        </div>
                    </div>
                </div>
                : 
                <div className='chat-page'>
                    <Chat />
                </div> 
            }
        </div>
    )
}

export default App