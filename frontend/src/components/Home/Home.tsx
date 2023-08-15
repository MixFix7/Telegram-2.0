import React, { FC, useContext, useEffect } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { SERVER_URL, urls } from '../Routing/Routing'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import ChatsComponent from '../Chats/ChatsComponent'
import ViewChat from '../ViewChat/ViewChat'

export const Home: FC = () => {
  const {logoutUser, user, updateTokens} = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()

  const {getChats} = useActions()

  const websocketConnect = () => {
    let url = `ws://localhost:8000/ws/socket-server/`

    const chatSocket = new WebSocket(url)

    chatSocket.onmessage = function(e){
      let data = JSON.parse(e.data)
      console.log('Data', data)
    }
  }

  useEffect(() => {
    if(user) {
      updateTokens()
      getChats(user.username)
      websocketConnect()
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
