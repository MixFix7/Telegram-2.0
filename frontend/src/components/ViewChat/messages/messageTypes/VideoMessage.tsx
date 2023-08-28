import React, { FC } from 'react'
import { IMessageType } from '../../../../types/typeMessages'
import { SERVER_URL } from '../../../Routing/Routing'

const VideoMessage: FC<IMessageType> = ({message}) => {
  return (
    <div className=''>
      <video 
        className='rounded-lg' 
        style={{width: '560px'}}
        controls
      >
        <source src={SERVER_URL + message.file} />
      </video>
    </div>
  )
}

export default VideoMessage
