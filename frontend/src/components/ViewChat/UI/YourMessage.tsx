import React, {ChangeEvent, ChangeEventHandler, EventHandler, FC, useState} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import DispatchMessageDate from '../../GlobalUI/DispatchMessageDate'
import MessageOptions from './MessageOptions'

const YourMessage: FC<IMessageComponent> = ({message, socket}) => {
  const [onMouse, setOnMouse] = useState<boolean>(false)
  const [isChangeMessage, setIsChangeMessage] = useState<boolean>(false)
  const [changingMessage, setChangingMessage] = useState<string | null | undefined>(message.text)

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
        {!isChangeMessage ? (
          <pre className='whitespace-pre-wrap flex justify-end'>
            {message.text}
          </pre>
        ) : (
          <textarea 
            className='bg-transparent text-right'
            style={{outline: 'none', borderColor: '#ccc'}}
            value={changingMessage!}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) => 
              setChangingMessage(event.currentTarget.value)}
          />
        )}



        <div className='w-full flex justify-end'>
          {onMouse && 
          <MessageOptions 
            message={message} 
            socket={socket}
            isChangeMessage={isChangeMessage}
            showChangeMessage={(bool: boolean) => setIsChangeMessage(bool)}
            changingMessage={changingMessage}
          />}
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
