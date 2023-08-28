import React, { FC } from 'react'
import { IMessageType } from '../../../../types/typeMessages'
import { SERVER_URL } from '../../../Routing/Routing'

const VideoMessage: FC<IMessageType> = ({message}) => {
  return (
    <div className=''>
      <video className='w-full h-full rounded-lg' controls>
        <source src={SERVER_URL + message.file} />
      </video>
    </div>
  )
}

export default VideoMessage
