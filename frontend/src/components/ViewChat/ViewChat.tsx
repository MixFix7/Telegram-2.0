import React, { FC, useContext, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IChat } from '../../types/typeInstances'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import {ChatMessages} from './ChatMessages'
import { TopChatLabel } from './UI/TopChatLabel'
import { SendMessage } from './SendMessage/SendMessage'
import { useActions } from '../../hooks/useActions'
import { WEBSOCKET_SERVER_URL } from '../Routing/Routing'

const ViewChat: FC = () => {
  const {user} = useContext(AuthContext) as AuthContextType

  const [socket, setSocket] = useState<WebSocket | null>(null)
 
  const {message, room} = useTypedSelector(state => state.websocket)
  const {viewChat} = useTypedSelector(state => state)

  const {
    updateChat, selectChat, setUrl, 
    setRoom, setMessage
  } = useActions()


  const connectToWebsocket = async () => {
    setRoom(`user_${user!.username}`)
    setUrl(`get-all-user-chats-messages/${user!.username}/`)

    const socket = new WebSocket(WEBSOCKET_SERVER_URL + `get-all-user-chats-messages/${user!.username}/`)
    setSocket(socket)

      socket.onopen = () => {
        socket.send(JSON.stringify({ command: "subscribe", room: room}))
      }
  
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        setMessage(data)
      }
    }


    const setNewChatData = () => {
      if (message.command === 'update_chat') {
        updateChat(message.data)
        selectChat(message.data)
      }
    }

    useEffect(() => {
      if(message) setNewChatData()
    }, [message])

    useEffect(() => {
      connectToWebsocket()
    }, [])

  if(viewChat) return (
        <div 
            className='
                h-full bg-transparent flex flex-col w-5/6
            '
        >
            <TopChatLabel/>
            <ChatMessages/>  
            <SendMessage socket={socket}/>  
        </div>
      )
    else return <></>
  }

export default ViewChat
