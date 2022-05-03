import React from 'react'
import {useContext} from 'react'
import { ChatContext } from './Chat'

function User({user}) {
    
    const {selectUser, selectedUser} = useContext(ChatContext);

    return (
        <div className={(selectedUser?.name === user.name ? 'user selected' : 'user')} onClick={()=>selectUser(user)}>
            {user.name}
        </div>
    )
}

function Users() {
    const {users} = useContext(ChatContext);

    return (
        <div className='users'>
            <p>Chat Users</p>
            {
                users.map(each=> {
                    return <User key={each.name} user={each}/>
                })
            }
        </div>
    )
}

export default Users