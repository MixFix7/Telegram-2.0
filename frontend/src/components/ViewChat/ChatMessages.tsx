import React, {useContext} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import Message from './UI/Message'
import YourMessage from './UI/YourMessage'
import ToYouMessage from './UI/ToYouMessage'

const ChatMessages = () => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType

  return (
    <div className='flex flex-col'>
        {viewChat!.messages.map((message) => (
            message.sender.username === user!.username ? (
                <YourMessage message={message}/>
            ) : (
                <ToYouMessage message={message}/> 
            )
        ))}
    </div>
  )
}

export {ChatMessages}
