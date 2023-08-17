import React, {FC} from 'react'
import { IChat } from '../../types/typeInstances'
import { IInterlocutorUsernameProps } from '../../types/typeGlobalUIComponents'
import { useInterlocutorName } from '../../hooks/useInterlocutorName'


const InterlocutorUsername: FC<IInterlocutorUsernameProps> = ({className, interlocutor1Name, interlocutor2Name}) => {
  const [username, interlocutorName] = useInterlocutorName(interlocutor1Name, interlocutor2Name)
  return (
    <span className={className}>
      {interlocutorName}
    </span>
  )
}

export {InterlocutorUsername}
