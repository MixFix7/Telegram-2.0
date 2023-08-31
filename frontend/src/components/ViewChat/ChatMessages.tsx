import React, {useContext, useRef, useEffect, FC} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import YourMessage from './messages/YourMessage'
import ToYouMessage from './messages/ToYouMessage'
import { ISendMessageP } from '../../types/typeViewChat'
import DateLabel from './UI/DateLabel'
import { useInterlocutorName } from '../../hooks/useInterlocutorName'
import { ChatService } from '../../services/chat.service'

const ChatMessages: FC<ISendMessageP> = ({ socket }) => {
  const { viewChat } = useTypedSelector((state) => state);
  const { user } = useContext(AuthContext) as AuthContextType;
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null)
  const { message } = useTypedSelector((state) => state.websocket);
  const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
  const chatService = new ChatService()
  const {chatsData} = useTypedSelector(state => state.chats)

  const scrollChatMessagesToEnd = () => {
    if (message.command === 'update_chat') {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  };

  
  const readMessages = async () => {
    const response = await chatService.readMessages(user!.username, viewChat!.id)
    .then((response) => {
        socket!.send(JSON.stringify({
            command: 'chat_message', 
            message: 'Message sent',
            sender_name: username,
            recipient_name: interlocutorName,
            chat_id: viewChat!.id,
        }))
    })
  }

  useEffect(() => {
    if (message) {
      scrollChatMessagesToEnd();
    } 
  }, [viewChat]);

  useEffect(() => {
    if (viewChat?.unread_messages! > 0 )
        readMessages()
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
  }, [messageRef.current])

  let currentDate = '';

  return (
    <div ref={messagesRef} className={`flex flex-col overflow-y-auto h-full`}>
      {viewChat!.messages
        ?.slice()
        .sort((a, b) => a.id - b.id)
        .map((message) => {
          const messageDate = new Date(message.dispatch_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          const shouldRenderDate = messageDate !== currentDate;
          currentDate = messageDate;

          return (
            <React.Fragment key={message.id}>
              {shouldRenderDate && (
                <DateLabel date={messageDate}/>
              )}
              {message?.sender.username === user!.username ? (
                <YourMessage key={message.id} message={message} socket={socket} />
              ) : (
                <ToYouMessage key={message.id} message={message} messageRef={messageRef}/>
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export { ChatMessages };
