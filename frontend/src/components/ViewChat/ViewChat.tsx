import React, { FC, useContext } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IChat } from '../../types/typeInstances'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import {ChatMessages} from './ChatMessages'
import { TopChatLabel } from './UI/TopChatLabel'

const ViewChat: FC = () => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType

  if(viewChat) return (
        <div 
            className='
                h-full bg-transparent flex flex-col w-full
                overflow-y-auto
            '
        >
            <TopChatLabel/>
            <ChatMessages/>

        
        </div>
      )
    else return <></>
  }

export default ViewChat
