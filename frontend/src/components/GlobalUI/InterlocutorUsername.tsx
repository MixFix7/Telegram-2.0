import React, {FC} from 'react'
import { IChat } from '../../types/typeInstances'
import { IInterlocutorUsernameProps } from '../../types/typeGlobalUIComponents'


const InterlocutorUsername: FC<IInterlocutorUsernameProps> = ({className, chat, username}) => {
  return (
    <span className={className}>
      {
      chat.interlocutor1.username === username
        ? chat.interlocutor2.username
        : chat.interlocutor2.username === username
        && chat.interlocutor1.username
         }
    </span>
  )
}

export {InterlocutorUsername}
