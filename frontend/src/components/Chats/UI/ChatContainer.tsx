import React, {FC, useContext, useEffect, useRef, useState} from 'react'
import { IChat } from '../../../types/typeInstances'
import Image from '../../GlobalUI/Image'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import InterlocutorAvatar from '../../GlobalUI/InterlocutorAvatar'
import { InterlocutorUsername } from '../../GlobalUI/InterlocutorUsername'
import { LastMessage } from './LastMessage'
import { ChatService } from '../../../services/chat.service'
import { useInterlocutorName } from '../../../hooks/useInterlocutorName'
import { getNormalDate } from './DateFunctions'


interface IChatProps {
  chat: IChat
  selected: {id: number, isSelected: boolean} | undefined
  selectCurrentChat: (chatId: number) => void
  socket: WebSocket | null
}


const ChatContainer: FC<IChatProps> = ({chat, selected, selectCurrentChat, socket}) => {
  const chatRef = useRef<HTMLDivElement | null>(null)
  const {user} = useContext(AuthContext) as AuthContextType
  const {selectChat} = useActions()
  const [username, interlocutorName] = useInterlocutorName(chat.interlocutor1.username, chat.interlocutor2.username)
  const {viewChat} = useTypedSelector(state => state)
  const isCurrentChat = chat.id === viewChat?.id
  

  const chatService = new ChatService()

  const readMessages = async () => {
    const response = await chatService.readMessages(user!.username, chat.id)
    .then((response) => {
        socket!.send(JSON.stringify({
            command: 'chat_message', 
            message: 'Message sent',
            sender_name: username,
            recipient_name: interlocutorName,
            chat_id: chat.id,
            read_message: isCurrentChat
        }))
    })
  }


  
  const onClick = async () => {
    selectChat(chat)
    selectCurrentChat(chat.id)
    if (chat.unread_messages! > 0) 
      await readMessages()
  }

  return (
      <div
        ref={chatRef}
        className={`
          w-full h-20 flex 
         cursor-pointer
          items-center justify-center
          p-2
          ${isCurrentChat ? 'bg-sky-700' : 'hover:bg-gray-700'}
        `}
        onClick={onClick}
      >
        <div className='flex items-center justify-center w-1/4'>
            <InterlocutorAvatar 
              className='rounded-full w-16 h-16' 
              chat={chat} 
              username={username}
            />
        </div>
        <div className='flex flex-col items-start justify-start w-3/4 ml-2'>
          <div className='w-full'>
              <div className='flex items-center w-full justify-between'>
                <InterlocutorUsername 
                  className='font-bold text-xl'
                  interlocutor1Name={chat.interlocutor1?.username}
                  interlocutor2Name={chat.interlocutor2?.username}
                />            
              </div>
          </div>
          <LastMessage chat={chat} username={username}/>
      </div>
      {chat.unread_messages! > 0 && 
        <div className='flex flex-col'>
          <h1 className=' bg-sky-600 rounded-full py-1 px-3'>{chat.unread_messages}</h1>
        </div>     
      }
    </div>
  )
}

export default ChatContainer
