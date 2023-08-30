import React, {useContext} from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useInterlocutorName } from '../../../hooks/useInterlocutorName'
import { IUser } from '../../../types/typeUser'
import OnlineStatus from '../../GlobalUI/OnlineStatus'

const TopChatLabel = () => {
    const {viewChat} = useTypedSelector(state => state)
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)

    const interlocutor: IUser = viewChat!.interlocutor1.username === interlocutorName ? viewChat?.interlocutor1! : viewChat?.interlocutor2!

  return (
    <div className='w-full flex flex-col p-4' style={{backgroundColor: '#1E2B3E'}}>
      <h1 className='text-2xl'>
        {interlocutorName}
      </h1>
        {interlocutor.is_online ? (
          <div className='flex items-center mt-1'>
            <OnlineStatus/>
            <span className='text-sm ml-1'>
              Online
            </span>
          </div>
        ) : (
          <span className='text-sm text-gray-500'>
              Was online at {interlocutor.was_online}
          </span>
        )}
    </div>
  )
}

export {TopChatLabel}
