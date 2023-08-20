import React, {FC} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import DispatchMessageDate from '../../GlobalUI/DispatchMessageDate'



const ToYouMessage: FC<IMessageComponent> = ({message}) => {
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
        <pre className='whitespace-pre-wrap flex justify-start'>
          {message.text}
        </pre>
        <div className='w-full flex justify-start'>
          <DispatchMessageDate 
            className='text-sm text-cyan-600'
            dispatchDateISO={message.dispatch_date}
          />
        </div>
      </div>
    </div>
  )
}

export default ToYouMessage
