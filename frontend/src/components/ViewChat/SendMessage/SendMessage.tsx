import React from 'react'
import Font from 'react-font'
import { InputMessage } from './UI/InputMessage'
import {IoMdSend} from 'react-icons/io'

const SendMessage = () => {
  return (
    <div className='
            w-full h-full mt-20 flex items-center
        '
    style={{backgroundColor: '#1E2B3E'}}
    >
      <InputMessage/>
      <button>
        <IoMdSend className='text-sky-500 hover:text-sky-600' size={'30px'}/>
      </button>
    </div>
  )
}

export {SendMessage}
