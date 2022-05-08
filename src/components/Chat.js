import React, { useEffect } from 'react'
import Users from './Users'
import ChatWindow from './ChatWindow'
import {createContext, useState} from 'react'

export const ChatContext = createContext(); 

function Chat({socket, username}) {
    
    const [users, setUsers] = useState([
        {name: 'henrique'}, 
        {name: 'denise'}, 
        {name: 'kirk'}
    ]); 

    const [selectedUser, setSelectedUser] = useState(); 

    useEffect(()=>{
        socket.emit('usersList', res => {
            console.log('list of users: ', res); 
        })
    }, [socket])

    const selectUser = user => {
        console.log(`${user.name} selected`)
        setSelectedUser(user); 
    }

    return (
        <>
            <ChatContext.Provider value={{username, socket, users, setUsers, selectedUser, setSelectedUser, selectUser}}>
                
                
                <ChatWindow />
                <Users />
                
            </ChatContext.Provider>
        </>
    )
}

export default Chat