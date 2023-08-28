import React, { FC, ChangeEvent } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'

interface IClipMessageFiles {
    setMessageFiles: (e: ChangeEvent<HTMLInputElement>) => void
}

const ClipMessage: FC<IClipMessageFiles> = ({setMessageFiles}) => {
  return (
    <div>
      <label htmlFor="fileInput">
        <AiOutlinePaperClip 
          className='
            cursor-pointer text-gray-500 hover:text-gray-100
            mx-3
          ' 
          size={'30px'}
        />
      </label>
      <input
        id="fileInput"
        type="file"
        multiple
        style={{ display: 'none' }}
        onChange={setMessageFiles}
      />
    </div>
  )
}

export default ClipMessage
