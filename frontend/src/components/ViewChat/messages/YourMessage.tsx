import React, {ChangeEvent, ChangeEventHandler, EventHandler, FC, useState} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import DispatchMessageDate from '../../GlobalUI/DispatchMessageDate'
import MessageOptions from '../UI/MessageOptions'
import TextMessage from './messageTypes/TextMessage'
import ImageMessage from './messageTypes/ImageMessage'
import VideoMessage from './messageTypes/VideoMessage'
import FileMessage from './messageTypes/FileMessage'
import { IMessageType } from '../../../types/typeMessages'
import DownloadFileAnimation from '../SendMessage/UI/DownloadFileAnimation'
import { BiCheckDouble } from 'react-icons/bi'

const YourMessage: FC<IMessageComponent> = ({message, socket}) => {
  const [onMouse, setOnMouse] = useState<boolean>(false)
  const [isChangeMessage, setIsChangeMessage] = useState<boolean>(false)
  const [changingMessage, setChangingMessage] = useState<string | null | undefined>(message.text)

  const messageTypes: {
    [key: string]: React.FC<IMessageType>;
} = {
    TextMessage: TextMessage,
    ImageMessage: ImageMessage,
    VideoMessage: VideoMessage,
    FileMessage: FileMessage,
}

  const CurrentMessage = messageTypes[message.type + 'Message']

  return (
    <div 
      className='w-full flex justify-end' 
    >
      {CurrentMessage === FileMessage 
      && <DownloadFileAnimation 
            isYourMessage={true}
            filePath={message.file!}
            fileName={message.file_name!}
      />}
      
      <div 
          className={`
          rounded-s-xl rounded-t-xl 
          ${CurrentMessage === TextMessage || CurrentMessage === FileMessage ? 'bg-sky-700 my-2 p-3' : ''}
        `}
          style={{minWidth: '100px', maxWidth: '800px'}}
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
          <CurrentMessage message={message}/>
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
          <div className='flex items-center'>
          <DispatchMessageDate 
              className='text-sm text-sky-500 flex items-center whitespace-nowrap'
              dispatchDateISO={message.dispatch_date}
          />
            <BiCheckDouble 
              size={'25px'} 
              className={`${message.isRead ? 'text-sky-400' : 'text-white'} ml-2`}
            />
          </div>
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
