import React, {useContext} from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'

const TopChatLabel = () => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType

  return (
    <div className='w-full p-4' style={{backgroundColor: '#1E2B3E'}}>
        <span className='text-2xl'>
            {viewChat?.interlocutor1.username === user!.username 
                ? viewChat.interlocutor2.username
                : viewChat?.interlocutor2.username === user!.username 
                && viewChat.interlocutor1.username }
        </span>
  </div>
  )
}

export {TopChatLabel}
