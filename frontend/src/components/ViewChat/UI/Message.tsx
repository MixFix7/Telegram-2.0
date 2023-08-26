import React, {FC, useState} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import MessageOptions from './MessageOptions'



const Message: FC<IMessageComponent> = ({message}) => {
  const [onMouse, setOnMouse] = useState<boolean>(false)

  return (
    <div 
        className='bg-sky-700 my-2 rounded-e-xl rounded-t-xl p-3'
        style={{minWidth: '100px', maxWidth: '400px'}}
        onMouseEnter={() => setOnMouse(true)}
        onMouseLeave={() => setOnMouse(false)}
    >
      <span>{message.sender.username}</span>
      <pre className='whitespace-pre-wrap'>
        {message.text}
      </pre>
      {onMouse && <MessageOptions message={message}/>}
    </div>
  )
}

export default Message
