import React, {FC} from 'react'
import { IMessageType } from '../../../../types/typeMessages'
import { SERVER_URL } from '../../../Routing/Routing'

const ImageMessage: FC<IMessageType> = ({message}) => {
  return (
    <div className=''>
        <img 
            className='rounded-lg'
            src={SERVER_URL + message.image}
            alt={message.type}
        />
    </div>
  )
}

export default ImageMessage
