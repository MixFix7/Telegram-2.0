import React, {FC, useEffect} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import ChatContainer from './UI/ChatContainer'
import ChatsTopPanel from './TopPanel/ChatsTopPanel'
import { UserChatComponent } from './UI/UserChatComponent'
import { useActions } from '../../hooks/useActions'

const ChatsComponent: FC = () => {
  const {isLoading, error, chatsData} = useTypedSelector(state => state.chats)
  const {foundedChats, foundedUsers, searchQuery} = useTypedSelector(state => state.searchChats)
  const {chats} = useTypedSelector(state => state.searchChats)
  const {setChats} = useActions()

  useEffect(() => {
    setChats(chatsData)
  }, [chatsData])

  return (
    <div 
      className='flex flex-col h-screen bg-gray-800 w-80 border-r-2 border-black'
    >
      <ChatsTopPanel/>

      <div className='flex flex-col overflow-y-auto'>
        {isLoading ? (
            <div>Loading...</div>
            ) : error ? (
            <h1 className='text-2xl text-red-500'>{}</h1>
            ) : chatsData && ( 
            <>

              {searchQuery.query.length > 0 &&
               foundedUsers?.map((user) => (
                <UserChatComponent key={user.id} user={user}/>
              ))}

              {searchQuery.query.length > 0 && 
              <h1 className='bg-gray-900 font-bold p-1 mt-2'>
                Messages
              </h1>}

              {foundedChats?.map((chat) => (
                  <ChatContainer key={chat.id} chat={chat}/>    
              ))} 

            </>
              
            )}
        </div>
    </div>
  )
}

export default ChatsComponent
