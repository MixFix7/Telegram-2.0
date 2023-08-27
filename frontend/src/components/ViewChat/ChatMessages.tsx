import React, {useContext, useRef, useEffect, FC} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import YourMessage from './UI/YourMessage'
import ToYouMessage from './UI/ToYouMessage'
import { ISendMessageP } from '../../types/typeViewChat'

const ChatMessages: FC<ISendMessageP> = ({socket}) => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType
    const messagesRef = useRef<HTMLDivElement | null>(null)
    const {message} = useTypedSelector(state => state.websocket)

    const scrollChatMessagesToEnd = () => {
        if (message.command === 'update_chat') {
            if (messagesRef.current) {
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
        {viewChat!.messages
        ?.slice()
        .sort((a, b) => a.id - b.id)
        .map((message) => (
            message?.sender.username === user!.username ? (
                <YourMessage key={message.id} message={message} socket={socket}/>
            ) : (
                <ToYouMessage key={message.id} message={message}/> 
            )
        ))}
    </div>
  )
}

export {ChatMessages}
