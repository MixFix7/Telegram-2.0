import { FC, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../../hooks/useActions'
import { SERVER_URL, urls } from '../Routing/Routing'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import ChatsComponent from '../Chats/ChatsComponent'
import ViewChat from '../ViewChat/ViewChat'
import { IChat } from '../../types/typeInstances'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { IUser } from '../../types/typeUser'
import { ChatService } from '../../services/chat.service'
import { PrivateRoute } from '../Routing/PrivateRoute'

export const Home: FC = () => {
  const {user, updateTokens} = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()
  const {getChats, setAllUsers} = useActions()
  const {allUsers, foundedChats} = useTypedSelector(state => state.searchChats)

  const service = new ChatService()

  const getChatsData = async () => {
    await updateTokens()
    await getAllUsers()
    getChats(user!.username)
  }

  const getAllUsers = async () => {
    const response = await service.getAllUsers(user!.username)
    .then(response => setAllUsers(response.data))
  }

  useEffect(() => {
    if(user) {
      getChatsData()
      getAllUsers()
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
