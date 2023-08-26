import React, { useRef, useState } from 'react'
import {BsChevronDown} from 'react-icons/bs'
import { IconBaseProps } from 'react-icons/lib'
import { useActions } from '../../../../hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';

const ShowLogoutButton1 = () => {
  const {showLogout} = useTypedSelector(state => state.showElements)
  const {showElement} = useActions()

  return (
    <div className='flex justify-end w-full'>
      <BsChevronDown
        className={`cursor-pointer transition-transform duration-300 transform
         text-gray-500 ${showLogout ? 'rotate-180' : ''}`}
        size={'20px'}
        onClick={() => showElement({key: 'showLogout'})}
      />
    </div>
  )
}

export default ShowLogoutButton1
