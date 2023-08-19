import React, { FC, useContext, useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { SERVER_URL, WEBSOCKET_SERVER_URL, urls } from '../Routing/Routing'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import ChatsComponent from '../Chats/ChatsComponent'
import ViewChat from '../ViewChat/ViewChat'
import { IChat } from '../../types/typeInstances'

export const Home: FC = () => {
  const {logoutUser, user, updateTokens} = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()
  const {getChats, setUrl, setRoom, setMessage} = useActions()
  const {url, room} = useTypedSelector(state => state.websocket)

  const connectToWebsocket = async () => {
    setRoom(`user_${user!.username}`)
    setUrl(`get-all-user-chats-messages/${user!.username}/`)

    const socket = new WebSocket(WEBSOCKET_SERVER_URL + `get-all-user-chats-messages/${user!.username}/`)

      socket.onopen = () => {
        socket.send(JSON.stringify({ command: "subscribe", room: room}))
      }
  
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        setMessage(data)
      }
    }


  useEffect(() => {
    if(user) {
      updateTokens()
      getChats(user.username)
      connectToWebsocket()
    } else
      navigate(urls.SignUp)
  }, [])

  document.body.style.backgroundColor = '#0E1621'

  return (
    <div className='flex items-center h-screen text-white'>
      <ChatsComponent/>
      <ViewChat/>
    </div>
  )
}
