import React, { useEffect } from 'react'
import Users from './Users'
import ChatWindow from './ChatWindow'
import {createContext, useState} from 'react'

export const ChatContext = createContext(); 

function Chat() {
    useEffect(()=>{
        console.log('load users list and setUsers');
    }, [])
    
    const [users, setUsers] = useState([
        {name: 'henrique'}, 
        {name: 'denise'}, 
        {name: 'kirk'}
    ]); 
    const [selectedUser, setSelectedUser] = useState(); 

    const selectUser = user => {
        console.log(`${user.name} selected`)
        setSelectedUser(user); 
    }

    return (
        <>
            <ChatContext.Provider value={{users, setUsers, selectedUser, setSelectedUser, selectUser}}>
                
                
                <ChatWindow />
                <Users />
                
            </ChatContext.Provider>
        </>
    )
}

export default Chat