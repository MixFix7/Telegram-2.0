import React, { FC } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IChat } from '../../types/typeInstances'
import Message from './UI/Message'
import YourMessage from './UI/YourMessage'
import ToYouMessage from './UI/ToYouMessage'

const ViewChat: FC = () => {
    const {viewChat} = useTypedSelector(state => state)

  if(viewChat)
      return (
          <div 
            className='
                h-full bg-transparent flex flex-col w-full
            '
        >
            <div className='w-full p-6' style={{backgroundColor: '#1E2B3E'}}>
                <span className='text-2xl'>
                    {viewChat.interlocutor2.username}
                </span>
            </div>
            <div className='flex flex-col'>
                {viewChat.messages.map((message) => (
                    <>
                        <ToYouMessage message={message}/>
                        <YourMessage message={message}/>
                    </>
                ))}
            </div>
          </div>
      )
    else
        return <></>
  }

export default ViewChat
