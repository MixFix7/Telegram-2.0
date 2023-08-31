import React, {FC} from 'react'
import { IChat } from '../../types/typeInstances'
import Image from './Image'
import { IInterlocutorAvatarProps } from '../../types/typeGlobalUIComponents'
import OnlineStatus from '../Chats/UI/OnlineStatus'


const InterlocutorAvatar: FC<IInterlocutorAvatarProps> = ({className, chat, username}) => {
  return (
    <div className='relative'>
      {chat?.interlocutor1.username === username
        ? (
          <>
            <Image
              className={className}
              img={chat.interlocutor2.avatar}
              alt={chat.interlocutor2.username}
            />
            {chat?.interlocutor2.is_online && <OnlineStatus className='absolute bottom-0 right-0'/>}
          </>
        )
        : chat?.interlocutor2.username === username
        && (
          <>
            <Image
              className={className}
              img={chat.interlocutor1.avatar}
              alt={chat.interlocutor1.username}
            />
            {chat?.interlocutor1.is_online && <OnlineStatus className='absolute bottom-0 right-0'/>}
          </>
        )}
    </div>
  )
}

export default InterlocutorAvatar
