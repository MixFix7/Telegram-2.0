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
}


const ChatContainer: FC<IChatProps> = ({chat}) => {
  const chatRef = useRef<HTMLDivElement | null>(null)
  const [isSelected, setIsSelected] = useState<boolean>(false)

  const {user} = useContext(AuthContext) as AuthContextType
  const {selectChat} = useActions()
  
  const username: string = user!.username 

  
  const onClick = () => {
    selectChat(chat)
    setIsSelected(!isSelected)
  }

  return (
      <div
      ref={chatRef}
      className={`
        w-full h-20 bg-transparent flex 
      hover:bg-gray-700 cursor-pointer
        items-center justify-center
        ${isSelected ? 'bg-sky-700' : ''}
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
