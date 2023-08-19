import React, {FC} from 'react'
import Font from 'react-font'
import { ILastMessage } from '../../../types/typeChatsComponents'

const LastMessage: FC<ILastMessage> = ({chat, username}) => {
    const lastMessage = chat.last_message?.text!
    
  return (
    <div className='text-gray-400 flex items-center w-full'>
        <Font family='Rubik'>
            <div className='flex items-center'>
                {chat.last_message?.sender?.username === username && (
                  <span className='mr-1'>You:</span>
                )}
                <p>
                  {lastMessage ? (
                     lastMessage.length > 19 
                      ? lastMessage.substring(0, 19) + "..." 
                      : lastMessage 
                  ) : (
                    'No messages'
                  )}
                </p>
            </div>
        </Font>
    </div>
  )
}

export {LastMessage}
