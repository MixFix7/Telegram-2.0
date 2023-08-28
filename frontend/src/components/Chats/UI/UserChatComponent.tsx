import React, {FC, useContext, useRef, useState} from 'react'
import { IChat } from '../../../types/typeInstances'
import Image from '../../GlobalUI/Image'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import InterlocutorAvatar from '../../GlobalUI/InterlocutorAvatar'
import { InterlocutorUsername } from '../../GlobalUI/InterlocutorUsername'
import { LastMessage } from './LastMessage'
import { IUser } from '../../../types/typeUser'
import { SERVER_URL } from '../../Routing/Routing'

interface IUserChatComponent {
  user: IUser
  selectCurrentChat: (chatId: undefined) => void
}

const UserChatComponent: FC<IUserChatComponent> = ({user, selectCurrentChat}) => {
  const chatRef = useRef<HTMLDivElement | null>(null)
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const {user: userData} = useContext(AuthContext) as AuthContextType
  const {setSearchQuery} = useActions()

  const {selectChat} = useActions()
  
  const onClick = () => {
    selectCurrentChat(undefined)
    const newChat: IChat = {
      id: 0,
      interlocutor1: {
        id: userData!.user_id,
        username: userData!.username,
        avatar: userData!.avatar,
        phoneNumber: userData!.phone_number
      },
      interlocutor2: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        phoneNumber: user.phoneNumber
      },
      messages: [],
    }
    selectChat(newChat)
    setIsSelected(!isSelected)
    setSearchQuery({
      query: '',
      username: user!.username,
    })
  }

  return (
      <div
        ref={chatRef}
        className={`
          w-full h-20 bg-transparent flex 
        hover:bg-gray-700 cursor-pointer
          items-center justify-center p-2
          ${isSelected ? 'bg-sky-700' : ''}
        `}
        onClick={onClick}
      >
        <div className='flex items-center justify-center w-1/4'>
          <Image
              className='rounded-full w-16 h-16'
              img={user.avatar}
              alt={user.username}
            />
        </div>
        <div className='flex flex-col items-start justify-start w-3/4 ml-2'>
          <div className='w-full'>
              <div className='flex items-center w-full justify-between'>
                <span 
                  className='font-bold text-xl'
                >
                  {user.username}
                </span>      
              </div>
          </div>
      </div>
    </div>
  )
}

export {UserChatComponent}
