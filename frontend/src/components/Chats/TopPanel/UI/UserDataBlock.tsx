import React, { FC, useContext } from 'react'
import { AuthContext } from '../../../Authorization/AuthContext'
import { AuthContextType } from '../../../Authorization/types'
import Image from '../../../GlobalUI/Image'
import { SERVER_URL } from '../../../Routing/Routing'
import ShowLogoutButton1 from '../Buttons/ShowLogoutButton1'
import { IUserDataBlock } from '../../../../types/typeOptions'

const UserDataBlock: FC<IUserDataBlock> = ({}) => {
    const {user} = useContext(AuthContext) as AuthContextType

  return (
    <div className='p-5 flex flex-col justify-start'>

      <div>
        <img
          className='rounded-full h-14 w-14'
          src={SERVER_URL + user!.avatar}
          alt='avatar'
        />
      </div>

      <div className='flex mt-3 items-center'>

        <span className='text-sm font-bold whitespace-nowrap'>
          {user!.username}
        </span>
        
        <ShowLogoutButton1 />

      </div>
    </div>
  )
}

export default UserDataBlock
