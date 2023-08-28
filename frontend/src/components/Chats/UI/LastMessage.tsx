import React, {FC} from 'react'
import { ILastMessage } from '../../../types/typeChatsComponents'
import { BiImage } from 'react-icons/bi'
import {GoVideo} from 'react-icons/go'
import { AiOutlineFile } from 'react-icons/ai'


const LastMessage: FC<ILastMessage> = ({chat, username}) => {
    const lastMessage = chat.last_message?.text!
    
  return (
    <div className='text-gray-400 flex items-center w-full'>
            <div className='flex items-center'>
                {chat.last_message?.sender?.username === username && (
                  <span className='mr-1'>You:</span>
                )}

                <div>
                  <p className='flex items-center'>
                    {lastMessage ? (
                       lastMessage.length > 19
                        ? lastMessage.substring(0, 19) + "..." 
                        : lastMessage
                    ) : chat.last_message?.image ? 
                      (
                        <>
                          <BiImage className='mr-1' size={'20px'}/>
                          Image
                        </>
                      ) : chat.last_message?.type === 'Video' ? (
                        <>
                          <GoVideo className='mr-1' size={'20px'}/>
                          Video
                        </>
                      ) : chat.last_message?.type === 'File' ? (
                        <>
                          <AiOutlineFile className='mr-1' size={'20px'}/>
                          File
                        </>
                      ) : (
                        'No messages'
                      )}
                  </p>
                </div>
            </div>
    </div>
  )
}

export {LastMessage}
