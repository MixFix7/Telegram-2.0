import React, {FC, useState} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import DispatchMessageDate from '../../GlobalUI/DispatchMessageDate'
import MessageOptions from './MessageOptions'

const YourMessage: FC<IMessageComponent> = ({message}) => {
  const [onMouse, setOnMouse] = useState<boolean>(false)

  return (
    <div 
      className='w-full flex justify-end' 
      >
      <div 
          className='bg-sky-700 my-2 rounded-s-xl rounded-t-xl p-3'
          style={{minWidth: '100px', maxWidth: '400px'}}
          onMouseEnter={() => setOnMouse(true)}
          onMouseLeave={() => setOnMouse(false)}
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
          {onMouse && <MessageOptions message={message}/>}
          <DispatchMessageDate 
              className='text-sm text-sky-500'
              dispatchDateISO={message.dispatch_date}
          />
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
