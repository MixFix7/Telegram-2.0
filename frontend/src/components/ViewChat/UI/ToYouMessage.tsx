import React, {FC} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'



const ToYouMessage: FC<IMessageComponent> = ({message}) => {
  return (
    <div className='w-full flex justify-start'>
      <div 
          className='my-2 rounded-e-xl rounded-t-xl p-3'
          style={{minWidth: '100px', maxWidth: '400px', backgroundColor: '#204165'}}
      >
        <span>{message.sender.username}</span>
        <pre className='whitespace-pre-wrap'>
          {message.text}
        </pre>
      </div>
    </div>
  )
}

export default ToYouMessage
