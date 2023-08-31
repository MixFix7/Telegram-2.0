import React, {FC} from 'react'
import { IChat } from '../../types/typeInstances'
import Image from './Image'
import { IInterlocutorAvatarProps } from '../../types/typeGlobalUIComponents'


const InterlocutorAvatar: FC<IInterlocutorAvatarProps> = ({className, chat, username}) => {
  return (
    <>
      {chat?.interlocutor1.username === username
        ? (
          <Image
            className={className}
            img={chat.interlocutor2.avatar}
            alt={chat.interlocutor2.username}
          />
        )
        : chat?.interlocutor2.username === username
        && (
          <Image
            className={className}
            img={chat.interlocutor1.avatar}
            alt={chat.interlocutor1.username}
          />
        )}
    </>
  )
}

export default InterlocutorAvatar
