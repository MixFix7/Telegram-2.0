import React, {FC} from 'react'
import { IMessageOptions } from '../../../types/typeViewChat'
import {FiTrash} from 'react-icons/fi'
import { BiPencil } from 'react-icons/bi'
import { MessageService } from '../../../services/message.service'

const MessageOptions: FC<IMessageOptions> = ({message}) => {
    const messageService = new MessageService()
  return (
    <div className='flex items-center w-full justify-start'>
      <FiTrash 
        className='cursor-pointer'
        size={'15px'}
        onClick={() => messageService.deleteMessage({id: message.id})}
      />
      <BiPencil
        className='cursor-pointer ml-1'
        size={'15px'}
        onClick={() => messageService.changeMessage({id: message.id}, 'changes')}
      />
    </div>
  )
}

export default MessageOptions
