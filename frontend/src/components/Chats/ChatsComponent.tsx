import React, {FC} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import ChatContainer from './UI/ChatContainer'
import ChatsTopPanel from './TopPanel/ChatsTopPanel'

const ChatsComponent: FC = () => {
  const {isLoading, error, chatsData} = useTypedSelector(state => state.chats)
  const {foundedChats} = useTypedSelector(state => state.searchChats)

  console.log(foundedChats)

  return (
    <div 
      className='flex flex-col h-screen bg-gray-800 w-80 border-r-2 border-black'
    >
      <ChatsTopPanel/>

      <div className='flex flex-col'>
        {isLoading ? (
            <div>Loading...</div>
            ) : error ? (
            <h1 className='text-2xl text-red-500'>{}</h1>
            ) : chatsData && (
              foundedChats?.map((chat) => (
              <>
              {console.log(chat)}
                <ChatContainer key={chat.id} chat={chat}/>
              </>
            ))
            )}
        </div>
    </div>
  )
}

export default ChatsComponent
