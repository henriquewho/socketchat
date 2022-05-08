import React from 'react'
import {useState, useEffect} from 'react'
import io, { Socket } from 'socket.io-client'
import Chat from './components/Chat'

import './scss/App.scss'

const socket = io.connect('http://localhost:3003');
//const socket = io.connect('https://warm-peak-24476.herokuapp.com/');

function App() {
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [logged, setLogged] = useState(false);

    const joinRoom = e => {
        e.preventDefault(); 
        if (username.length===0 || password.length===0) {
            alert('Name and Password must be informed');
            return; 
        } else if (username.includes(' ') || password.includes(' ')) {
            alert('Name and Password must not have a space'); 
            return; 
        } else {
            console.log('login with ', username, password); 
            // first check user credentials, then join
            socket.emit('join', {username, password}, ()=>{
                setLogged(true); 
            })
            
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
                                <input type='password' placeholder='password...'
                                onChange={e=>setPassword(e.target.value)} value={password}></input>
                                <button onClick={joinRoom}>Join chat</button>
                            </form>
                        </div>
                    </div>
                </div>
                : 
                <div className='chat-page'>
                    <Chat socket={socket} username={username}/>
                </div> 
            }
        </div>
    )
}

export default App