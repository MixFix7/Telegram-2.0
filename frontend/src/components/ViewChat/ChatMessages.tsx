import React, {useContext, useRef, useEffect} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import Message from './UI/Message'
import YourMessage from './UI/YourMessage'
import ToYouMessage from './UI/ToYouMessage'

const ChatMessages = () => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType
    const messagesRef = useRef<HTMLDivElement | null>(null)
    const {message} = useTypedSelector(state => state.websocket)

    const scrollChatMessagesToEnd = () => {
        if (message.command === 'update_chat') {
            if (messagesRef.current) {
                console.log(messagesRef.current.scrollHeight)
                messagesRef.current.scrollTop = messagesRef.current.scrollHeight
            }
        }
    }

    useEffect(() => {   
        if(message) 
            scrollChatMessagesToEnd()
    }, [viewChat]) 

    useEffect(() => {
        if(messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
    })

  return (
    <div 
        ref={messagesRef} 
        className={`flex flex-col overflow-y-auto h-full`}
    >
        {viewChat!.messages.map((message) => (
            message.sender.username === user!.username ? (
                <YourMessage key={message.id} message={message}/>
            ) : (
                <ToYouMessage key={message.id} message={message}/> 
            )
        ))}
    </div>
  )
}

export {ChatMessages}
