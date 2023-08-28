import React, {FC, useContext} from 'react'
import { IMessageOptions } from '../../../types/typeViewChat'
import {FiTrash} from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { MessageService } from '../../../services/message.service'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useInterlocutorName } from '../../../hooks/useInterlocutorName'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import SaveMessageChanges from './SaveMessageChanges'

const MessageOptions: FC<IMessageOptions> = ({message, socket, isChangeMessage, showChangeMessage, changingMessage}) => {
    const messageService = new MessageService()
    const {user} = useContext(AuthContext) as AuthContextType
    const {viewChat} = useTypedSelector(state => state)
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)

  return (
    <div className='flex items-center w-full justify-start'>
      <FiTrash 
        className='cursor-pointer'
        size={'15px'}
        onClick={() => {
            messageService.deleteMessage({id: message.id})
            .then(() => {
              socket!.send(JSON.stringify({
                command: 'chat_message', 
                message: 'Message sent',
                sender_name: username,
                recipient_name: interlocutorName,
                chat_id: viewChat!.id,
            }))
            })
        }
    }
      />
      {message.type === 'Text' && !isChangeMessage ? (
        <BiPencil
          className='cursor-pointer ml-1'
          size={'15px'}
          onClick={() => showChangeMessage(true)}
        />

      ) : message.type === 'Text' && (
        <SaveMessageChanges 
          messageId={message.id} 
          changingMessage={changingMessage!}
          socket={socket}
          showChangeMessage={showChangeMessage}
        />
      )}
    </div>
  )
}

export default MessageOptions
