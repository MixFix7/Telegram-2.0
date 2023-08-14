import React, {FC} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import { getNormalDate, isToday } from '../../Chats/UI/ChatContainer'



const ToYouMessage: FC<IMessageComponent> = ({message}) => {
  const dispatch_date: string = getNormalDate(message.dispatch_date)

  return (
    <div className='w-full flex justify-start'>
      <div className='h-full flex flex-col justify-end mx-2'>
        <Image
          className='rounded-full w-12 h-12 mb-2'
          img={message.sender.avatar}
          alt={message.sender.username}
        />
      </div>
      <div 
          className='my-2 rounded-e-xl rounded-t-xl p-3'
          style={{minWidth: '100px', maxWidth: '400px', backgroundColor: '#204165'}}
      >
       <div className='flex justify-start'>
          <span 
            className='font-bold'
          >
            {message.sender.username}
          </span>
        </div>
        <pre className='whitespace-pre-wrap flex justify-end'>
          {message.text}
        </pre>
        <div className='w-full flex justify-start'>
          <span className='text-sm text-cyan-600'>
            {isToday(dispatch_date) 
              ? dispatch_date.substring(16, 10) 
              : dispatch_date.substring(0, 10)}  
          </span>
        </div>
      </div>
    </div>
  )
}

export default ToYouMessage
