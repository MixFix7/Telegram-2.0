import React, { FC, useContext } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IChat } from '../../types/typeInstances'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import {ChatMessages} from './ChatMessages'
import { TopChatLabel } from './UI/TopChatLabel'
import { SendMessage } from './SendMessage/SendMessage'

const ViewChat: FC = () => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType

  if(viewChat) return (
        <div 
            className='
                h-full bg-transparent flex flex-col w-full
            '
        >
            <TopChatLabel/>
            <ChatMessages/>  
            <SendMessage/>  
        </div>
      )
    else return <></>
  }

export default ViewChat
