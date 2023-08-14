import React, {FC} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import { getNormalDate, isToday } from '../../Chats/UI/ChatContainer'

const YourMessage: FC<IMessageComponent> = ({message}) => {
  const dispatch_date: string = getNormalDate(message.dispatch_date)

  return (
    <div className='w-full flex justify-end'>
      <div 
          className='bg-sky-700 my-2 rounded-s-xl rounded-t-xl p-3'
          style={{minWidth: '100px', maxWidth: '400px'}}
      >
        <div className='flex justify-end'>
          <span 
            className='font-bold'
          >
            {message.sender.username}
          </span>
        </div>
        <pre className='whitespace-pre-wrap flex justify-end'>
          {message.text}
        </pre>
        <div className='w-full flex justify-end'>
          <span className='text-sm text-sky-500'>
            {isToday(dispatch_date) 
              ? dispatch_date.substring(16, 10) 
              : dispatch_date.substring(0, 10)}  
          </span>
        </div>
      </div>
      <div className='h-full flex flex-col justify-end mx-2'>
        <Image
          className='rounded-full w-12 h-12 mb-2'
          img={message.sender.avatar}
          alt={message.sender.username}
        />
      </div>
    </div>
  )
}

export default YourMessage
