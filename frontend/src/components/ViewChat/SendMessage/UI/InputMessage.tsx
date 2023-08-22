import React, {ChangeEvent, FC} from 'react'

interface IInputMessage {
  messageContent: string
  setMessageContent: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputMessage: FC<IInputMessage> = ({messageContent, setMessageContent}) => {
  return (
    <div className='w-5/6 ml-16 ring-0 outline-none border-0'>
        <input 
            className='w-full bg-transparent text-lg'
            type="text" 
            name='message'
            placeholder='Write a message...'
            style={{outline: 'none', borderColor: '#ccc'}}
            value={messageContent}
            onChange={setMessageContent}
        />
    </div>
  )
}

export {InputMessage}
