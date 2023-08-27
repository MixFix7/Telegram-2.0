import React, {FC, useContext, useRef, useState} from 'react'
import { IChat } from '../../../types/typeInstances'
import Image from '../../GlobalUI/Image'
import Font from 'react-font'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import InterlocutorAvatar from '../../GlobalUI/InterlocutorAvatar'
import { InterlocutorUsername } from '../../GlobalUI/InterlocutorUsername'
import { LastMessage } from './LastMessage'

interface IChatProps {
  chat: IChat
  selected: {id: number, isSelected: boolean} | undefined
  selectCurrentChat: (chatId: number) => void
}


const ChatContainer: FC<IChatProps> = ({chat, selected, selectCurrentChat}) => {
  const chatRef = useRef<HTMLDivElement | null>(null)
  const {user} = useContext(AuthContext) as AuthContextType
  const {selectChat} = useActions()

  const username: string = user!.username 

  
  const onClick = () => {
    selectChat(chat)
    selectCurrentChat(chat.id)
  }

  return (
      <div
        ref={chatRef}
        className={`
          w-full h-20 flex 
         cursor-pointer
          items-center justify-center
          p-2
          ${selected?.isSelected ? 'bg-sky-700' : 'hover:bg-gray-700'}
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
            <Font family='Rubik'>
              <div className='flex items-center w-full justify-between'>
                <InterlocutorUsername 
                  className='font-bold text-xl'
                  interlocutor1Name={chat.interlocutor1?.username}
                  interlocutor2Name={chat.interlocutor2?.username}
                />            
              </div>
            </Font>
          </div>
          <LastMessage chat={chat} username={username}/>
      </div>
    </div>
  )
}

export default ChatContainer
