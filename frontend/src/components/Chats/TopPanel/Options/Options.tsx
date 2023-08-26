import React, {FC, useState} from 'react'
import UserDataBlock from '../UI/UserDataBlock'
import {LogoutBlock} from '../LogoutBlock/LogoutBlock'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { useActions } from '../../../../hooks/useActions'
import Option from './Option'

import {MdGroup} from 'react-icons/md'
import {LiaBullhornSolid} from 'react-icons/lia' 
import {BiUserCircle} from 'react-icons/bi' 
import {SlCallEnd} from 'react-icons/sl' 
import {BsBookmark} from 'react-icons/bs' 
import {LuSettings} from 'react-icons/lu' 

interface IOptionsComp {
  hideOptions: () => void
}

const Options: FC<IOptionsComp> = ({hideOptions}) => {
  const {showLogout} = useTypedSelector(state => state.showElements)
  const {showElement} = useActions()

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      hideOptions();
    }
  }

  const options = [
    {
      id: 1,
      icon: <MdGroup size={'25px'}/>,
      label: 'New group',
      showModal: () => showElement({key: 'NewGroup'})
    },
    {
      id: 2,
      icon: <BiUserCircle size={'25px'}/>,
      label: 'New channel',
      showModal: () => showElement({key: 'NewChannel'})
    },
    {
      id: 3,
      icon: <LiaBullhornSolid size={'25px'}/>,
      label: 'Contacts',
      showModal: () => showElement({key: 'Contacts'})
    },
    {
      id: 4,
      icon: <SlCallEnd size={'25px'} style={{rotate: '270deg'}}/>,
      label: 'Calls',
      showModal: () => showElement({key: 'Calls'})
    },
    {
      id: 5,
      icon: <BsBookmark size={'25px'}/>,
      label: 'Saved',
      showModal: () => showElement({key: 'Saved'})
    },
    {
      id: 6,
      icon: <LuSettings size={'25px'}/>,
      label: 'Settings',
      showModal: () => showElement({key: 'Settings'})
    },
  ]


  return (
    <>
      <div 
        className='modal-background' 
        onClick={handleBackgroundClick}
      >
        <div 
          className='modal-content h-full w-80 bg-gray-800' 
        >
           <UserDataBlock/>
           {showLogout && 
            <LogoutBlock/>
           }

           {options.map((option) => (
            <Option
              key={option.id}
              Icon={option.icon}
              label={option.label}
              showModal={option.showModal}
            />
           ))}

        </div>
      </div>
    </>
  )
}

export default Options
