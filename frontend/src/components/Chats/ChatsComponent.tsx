import React, {FC} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import ChatContainer from './UI/ChatContainer'
import { TypeChat } from '../../types/typeChatsComponents'

const ChatsComponent: FC = () => {
  const {isLoading, error, chatsData} = useTypedSelector(state => state.chats)

  return (
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
  )
}

export default ChatsComponent
