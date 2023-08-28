import React, {ChangeEvent, FC} from 'react'

interface IInputMessage {
  messageContent: string
  setMessageContent: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

const InputMessage: FC<IInputMessage> = ({messageContent, setMessageContent}) => {

  const getRows = (text: string) => {
    return text.split('\n').length;
};


  return (
    <div className='w-5/6  ring-0 outline-none border-0'>
        <textarea 
            className='w-full bg-transparent text-lg' 
            name='message'
            rows={getRows(messageContent)}
            placeholder='Write a message...'
            style={{outline: 'none', borderColor: '#ccc'}}
            value={messageContent}
            onChange={setMessageContent}
        />
    </div>
  )
}

export {InputMessage}
