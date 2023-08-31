import { FC, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL, urls } from '../Routing/Routing'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import ChatsComponent from '../Chats/ChatsComponent'
import ViewChat from '../ViewChat/ViewChat'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChatService } from '../../services/chat.service'

export const Home: FC = () => {
  const {user, updateTokens} = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()
  const {getChats, setAllUsers} = useActions()
  const {allUsers, foundedChats} = useTypedSelector(state => state.searchChats)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const service = new ChatService()

  const getChatsData = async () => {
    await updateTokens()
    .then (() => {
      getAllUsers()
      getChats(user!.username)
    })
  }

  const getAllUsers = async () => {
    const response = await service.getAllUsers(user!.username)
    .then(response => setAllUsers(response.data))
  }

  useEffect(() => {
    if(user) {
      getChatsData()
    } else
      navigate(urls.SignUp)
    }, [])
    
  document.body.style.backgroundColor = '#0E1621'

  return (
      <div className='flex items-center h-screen text-white'>
        <ChatsComponent socket={socket}/>
        <ViewChat setWebsocket={(socket: WebSocket) => setSocket(socket)}/>
      </div>
  )
}
