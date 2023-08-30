import React, {FC} from 'react'
import { IMessageComponent } from '../../../types/typeGlobalUIComponents'
import Image from '../../GlobalUI/Image'
import DispatchMessageDate from '../../GlobalUI/DispatchMessageDate'
import TextMessage from './messageTypes/TextMessage'
import ImageMessage from './messageTypes/ImageMessage'
import VideoMessage from './messageTypes/VideoMessage'
import FileMessage from './messageTypes/FileMessage'
import { IMessageType } from '../../../types/typeMessages'
import DownloadFileAnimation from '../SendMessage/UI/DownloadFileAnimation'


const ToYouMessage: FC<IMessageComponent> = ({message, messageRef}) => {

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
    <div ref={messageRef} className='w-full flex justify-start'>
      <div className='h-full flex flex-col justify-end mx-2'>
        <Image
          className='rounded-full w-12 h-12 mb-2'
          img={message.sender.avatar}
          alt={message.sender.username}
        />
      </div>
      <div 
          className={`
          rounded-t-xl rounded-e-xl 
          ${CurrentMessage === TextMessage 
          || CurrentMessage === FileMessage ? 'my-2 p-3 bg-sky-900' : ''}
        `}
          style={{minWidth: '100px', maxWidth: '800px'}}
      >
       <div className='flex justify-start'>
          <span 
            className='font-bold'
          >
            {message.sender.username}
          </span>
        </div>
          <CurrentMessage message={message}/>
        <div className='w-full flex justify-start items-center'>
          <DispatchMessageDate 
            className='text-sm text-cyan-600'
            dispatchDateISO={message.dispatch_date}
          />
         
        </div>
      </div>
      {CurrentMessage === FileMessage 
      && <DownloadFileAnimation 
            isYourMessage={false}
            filePath={message.file!}
            fileName={message.file_name!}
        />}
    </div>
  )
}

export default ToYouMessage
