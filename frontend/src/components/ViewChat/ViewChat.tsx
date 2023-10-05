import React, { FC, useContext, useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import {ChatMessages} from './ChatMessages'
import { TopChatLabel } from './UI/TopChatLabel'
import { SendMessage } from './SendMessage/SendMessage'
import { useActions } from '../../hooks/useActions'
import { WEBSOCKET_SERVER_URL } from '../Routing/Routing'

interface IViewChat {
  setWebsocket: (socket: WebSocket) => void
}

const ViewChat: FC<IViewChat> = ({setWebsocket}) => {
  const [isClosing, setIsClosing] = useState<boolean>(false)

  const {user} = useContext(AuthContext) as AuthContextType

  const [socket, setSocket] = useState<WebSocket | null>(null)
  
  const {message, room} = useTypedSelector(state => state.websocket) 
  const {viewChat} = useTypedSelector(state => state)
  const {viewChatMobile} = useTypedSelector(state => state.showElements)

  const {showElement} = useActions()

  const {
    updateChat, selectChat, setUrl, 
    setRoom, setMessage
  } = useActions()

  const closeChat = () => {
    setIsClosing(true)
    setTimeout(() => {
      showElement({key: 'viewChatMobile'})
      setIsClosing(false)
    }, 400)
  }
 
  const connectToWebsocket = async () => {
    setRoom(`user_${user!.username}`)
    setUrl(`get-all-user-chats-messages/${user!.username}/`)

    const socket = new WebSocket(WEBSOCKET_SERVER_URL + `get-all-user-chats-messages/${user!.username.replace(' ', 'O')}/`)
    setSocket(socket)
    setWebsocket(socket)

    socket.onopen = () => {
      socket.send(JSON.stringify({ command: "subscribe", room: room}))
    }
  
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.command === 'update_chat')
        setMessage(data)
    }

    socket.onclose = () => {
      socket!.send(JSON.stringify({ command: 'user_exit' }))
    }
  }


    const setNewChatData = () => {
      if (message.command === 'update_chat') {
        updateChat(message.data)
      if (viewChat && message.data.id === viewChat!.id)
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
            className={`
                h-full flex-col w-full sm:w-5/6 sm:flex z-10 absolute left-full sm:z-0 sm:static
                ${isClosing ? 'closing-chat-animation-mobile' : ''}
                ${viewChatMobile ? 'open-chat-animation-mobile' : 'hidden'}
            `}
            style={{backgroundColor: '#0E1621'}}
        >
            <TopChatLabel closeChat={closeChat}/>
            <ChatMessages socket={socket}/>  
            <SendMessage socket={socket}/>  
        </div>
      )
    else return <></>
  }

export default ViewChat
