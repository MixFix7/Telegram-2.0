import React, {FC, useContext} from 'react'
import { MessageService } from '../../../services/message.service'
import { IoMdCheckmark } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { useInterlocutorName } from '../../../hooks/useInterlocutorName'

interface ISaveMessageChanges {
    messageId: number
    changingMessage: string
    socket: WebSocket | null | undefined
    showChangeMessage: (bool: boolean) => void
}

const SaveMessageChanges: FC<ISaveMessageChanges> = ({messageId, changingMessage, socket, showChangeMessage}) => {
    const messageService = new MessageService()
    const {user} = useContext(AuthContext) as AuthContextType
    const {viewChat} = useTypedSelector(state => state)
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
  return (
    <div className='flex items-center'>
      <IoMdCheckmark 
        className='cursor-pointer' 
        size={'20px'}
        onClick={() => {
            messageService.changeMessage({id: messageId}, changingMessage!)
            .then(() => {
              socket!.send(JSON.stringify({
                command: 'chat_message', 
                message: 'Message sent',
                sender_name: username,
                recipient_name: interlocutorName,
                chat_id: viewChat!.id,
            }))
            showChangeMessage(false)
            })
          }}
      />
      <RxCross2 
        className='cursor-pointer' 
        size={'20px'}
        onClick={() => showChangeMessage(false)}
      />
    </div>
  )
}

export default SaveMessageChanges
