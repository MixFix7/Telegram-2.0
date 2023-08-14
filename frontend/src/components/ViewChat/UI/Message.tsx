import React, {FC} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'



const Message: FC<IMessageComponent> = ({message}) => {
  return (
    <div 
        className='bg-sky-700 my-2 rounded-e-xl rounded-t-xl p-3'
        style={{minWidth: '100px', maxWidth: '400px'}}
    >
      <span>{message.sender.username}</span>
      <pre className='whitespace-pre-wrap'>
        {message.text}
      </pre>
    </div>
  )
}

export default Message
