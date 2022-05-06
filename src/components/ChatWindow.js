import React from 'react'
import {useState, useEffect, useContext} from 'react'
import { ChatContext } from './Chat'

function ChatWindow() {
    const {selectedUser, socket, username} = useContext(ChatContext);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]); 

    useEffect(()=>{
        if (selectedUser) {
            console.log(`load ${selectedUser.name} msgs`)
            // replace with the correct method to get messages for the user
            socket.emit('findAllMessages', {}, response => {
                console.log(response); 
                setMessages(response); 
            })
        }
    }, [selectedUser])

    useEffect(()=>{
        socket.on('message', message => {
            
            setMessages(prev => {
                return prev.concat(message); 
            })
        })
    }, [socket])

    const sendMessage = e => {
        const trimmedMessage = currentMessage.trim(); 
        if (trimmedMessage.length>0){
            console.log(`send ${trimmedMessage}`)
            setCurrentMessage('');
        } else {
            setCurrentMessage(''); 
        }

        socket.emit('createMessage', {
            text: currentMessage, name: username
        })
    }

    return (
        <div className='chat-window'>

            <div className='chat-body'>

                <div className='message-container'>
                    {messages.map(each => {
                        return <p>{each.text}</p>
                    })}
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