import React, {FC, useContext, useEffect, useState} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import ChatContainer from './UI/ChatContainer'
import ChatsTopPanel from './TopPanel/ChatsTopPanel'
import { UserChatComponent } from './UI/UserChatComponent'
import { useActions } from '../../hooks/useActions'
import { TSelectedChat } from '../../types/typeViewChat'
import { compareDates } from './UI/DateFunctions'
import LoadingChat from './UI/LoadingChat'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'

interface IChatsComponent {
  socket: WebSocket | null
}

const ChatsComponent: FC<IChatsComponent> = ({socket}) => {
  const [selectChats, setSelectedChats] = useState<TSelectedChat[]>([])

  const {user} = useContext(AuthContext) as AuthContextType

  const {isLoading, error, chatsData} = useTypedSelector(state => state.chats)
  const {foundedChats, foundedUsers, searchQuery} = useTypedSelector(state => state.searchChats)
  const {chats} = useTypedSelector(state => state.searchChats)

  const {setChats} = useActions()

  useEffect(() => {
    setChats(chatsData)
    setSelectedChats(
      chatsData?.map((chat) => ({id: chat.id, isSelected: false}))
    )
  }, [chatsData])

  const selectCurrentChat = (chatID: number | undefined) => {
    setSelectedChats(prevChats => {
      const updatedChats = prevChats.map(chat => {
        if (chatID === undefined) {
          return { ...chat, isSelected: false }
        } else if (chat.id === chatID) {
          return { ...chat, isSelected: true }
        } else {
          return { ...chat, isSelected: false }
        }
      });
  
      return updatedChats;
    });
};

  console.log(foundedChats)
  
  

  return (
    <div 
      className='flex flex-col h-screen bg-gray-800 w-full sm:w-80 xl:border-r-2 border-black'
    >
      <ChatsTopPanel/>

      <div className='flex flex-col overflow-y-auto'>
        {isLoading ? (
            <>
              {Array.from({length: user!.chat_count}, (_, i) => (
                <LoadingChat/>
              ))}
            </>
            ) : error ? (
            <h1 className='text-2xl text-red-500'>{}</h1>
            ) : chatsData && ( 
            <>

              {searchQuery.query.length > 0 &&
               foundedUsers?.map((user) => (
                <UserChatComponent 
                  key={user.id} 
                  user={user}
                  selectCurrentChat={(chatId: undefined) => selectCurrentChat(chatId)}
                />
              ))}

              {searchQuery.query.length > 0 && 
              <h1 className='bg-gray-900 font-bold p-1 mt-2'>
                Messages
              </h1>}

              {Array.from(foundedChats)
              .sort(compareDates)
              .sort((a, b) => b.unread_messages! - a.unread_messages!)
              .map((chat) => (
                  <ChatContainer 
                    key={chat.id} 
                    chat={chat}
                    selected={selectChats
                      .find(schat => schat.id === chat.id) as
                       { id: number; isSelected: boolean; }}
                    selectCurrentChat={(chatId: number) => selectCurrentChat(chatId)}
                    socket={socket}
                  />    
              ))} 

            </>
              
            )}
        </div>
    </div>
  )
}

export default ChatsComponent
