import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { ChatContext } from './Chat'

function ChatWindow() {
    const {selectedUser} = useContext(ChatContext);

    useEffect(()=>{
        if (selectedUser) {
            console.log(`load ${selectedUser.name} msgs`)
        }
    }, [selectedUser])

    const [currentMessage, setCurrentMessage] = useState('');

    const sendMessage = e => {
        const trimmedMessage = currentMessage.trim(); 
        if (trimmedMessage.length>0){
            console.log(`send ${trimmedMessage}`)
            setCurrentMessage('');
        } else {
            setCurrentMessage(''); 
        }
    }

    return (
        <div className='chat-window'>

            <div className='chat-body'>

                <div className='message-container'>

                </div>
                
            </div>

            <div className='chat-footer'>
                <input 
                type='text' value={currentMessage} 
                onChange={e=>setCurrentMessage(e.target.value)}
                onKeyPress={(event) =>
                    event.key === "Enter" && sendMessage()
                }
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default ChatWindow