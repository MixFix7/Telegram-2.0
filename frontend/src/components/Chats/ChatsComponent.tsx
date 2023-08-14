import React, {FC} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import ChatContainer from './UI/ChatContainer'

const ChatsComponent: FC = () => {
  const {isLoading, error, chatsData} = useTypedSelector(state => state.chats)
  console.log(chatsData)

  return (
    <div 
      className='flex flex-col h-screen bg-gray-800 w-80 border-r-2 border-black'
    >

      <div className='flex flex-col'>
        {isLoading ? (
            <div>Loading...</div>
            ) : error ? (
            <h1 className='text-2xl text-red-500'>{error}</h1>
            ) : chatsData && (
            chatsData.map((chat) => (
              <>
                <ChatContainer key={chat.id} chat={chat}/>
              </>
            ))
            )}
        </div>
    </div>
  )
}

export default ChatsComponent
