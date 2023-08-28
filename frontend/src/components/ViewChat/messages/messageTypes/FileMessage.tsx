import React, { FC } from 'react'
import { IMessageType } from '../../../../types/typeMessages'
import {AiOutlineFile} from 'react-icons/ai'


const FileMessage: FC<IMessageType> = ({message}) => {
  return (
    <div className='flex items-center justify-between p-2'>
        <AiOutlineFile size={'40px'}/>
        <span className='text-xl'>
            {message.file_name}
        </span>
    </div>
  )
}

export default FileMessage
