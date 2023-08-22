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

export const Home: FC = () => {
  const {user, updateTokens} = useContext(AuthContext) as AuthContextType
  const navigate = useNavigate()
  const {getChats, setAllUsers} = useActions()
  const {allUsers, foundedChats} = useTypedSelector(state => state.searchChats)

  const getChatsData = async () => {
    await updateTokens()
    await getAllUsers()
    getChats(user!.username)
  }

  const getAllUsers = async () => {
      const token: string = JSON.parse(localStorage.getItem('authTokens')!).access
      const response = await fetch(SERVER_URL + '/api/chats/all-users/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          },
          body: JSON.stringify({
              'username': user!.username
          })
      })
      if (response.ok) {
        const data: IUser[] = await response.json()
        setAllUsers(data)
        
      }
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
