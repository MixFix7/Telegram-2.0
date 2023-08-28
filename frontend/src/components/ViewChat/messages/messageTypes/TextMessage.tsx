import React, {FC, useContext} from 'react'
import { IMessageComponent } from '../../../../types/typeGlobalUIComponents'
import Image from '../../../GlobalUI/Image'
import DispatchMessageDate from '../../../GlobalUI/DispatchMessageDate'
import { IMessageType } from '../../../../types/typeMessages'
import { AuthContext } from '../../../Authorization/AuthContext'
import { AuthContextType } from '../../../Authorization/types'

const TextMessage: FC<IMessageType> = ({message}) => {
    const {user} = useContext(AuthContext) as AuthContextType

  return (
    <pre className={`whitespace-pre-wrap flex ${message.sender.username === user!.username ? 'justify-end' : 'justify-start'}`}>
        {message.text}
    </pre>
  )
}

export default TextMessage
