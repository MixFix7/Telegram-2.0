import React, { FC } from 'react'
import { IMessageType } from '../../../../types/typeMessages'
import {AiOutlineFile} from 'react-icons/ai'


const FileMessage: FC<IMessageType> = ({message}) => {
  return (
    <div className='flex items-center justify-between p-2'>
      <div>
        <AiOutlineFile className='text-2xl sm:text-4xl'/>
      </div>
        <span className='text-sm sm:text-xl'>
            {message.file_name}
        </span>
    </div>
  )
}

export default FileMessage
