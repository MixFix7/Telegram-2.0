import React, { FC } from 'react'
import { IconType } from 'react-icons/lib'

interface IOption {
    Icon: JSX.Element
    label: string
    showModal: any
}

const Option: FC<IOption> = ({Icon, label, showModal}) => {
  return (
    <div 
        className='w-full px-8 py-3 hover:bg-gray-700 
        flex items-center justify-start cursor-pointer'
        onClick={showModal}
    >
      {Icon}

      <span className='font-semibold ml-4 text-base'>
        {label}
      </span>
    </div>
  )
}

export default Option
