import React, {useContext, useRef, useEffect, FC} from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { AuthContext } from '../Authorization/AuthContext'
import { AuthContextType } from '../Authorization/types'
import YourMessage from './messages/YourMessage'
import ToYouMessage from './messages/ToYouMessage'
import { ISendMessageP } from '../../types/typeViewChat'
import DateLabel from './UI/DateLabel'

const ChatMessages: FC<ISendMessageP> = ({ socket }) => {
  const { viewChat } = useTypedSelector((state) => state);
  const { user } = useContext(AuthContext) as AuthContextType;
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const { message } = useTypedSelector((state) => state.websocket);

  const scrollChatMessagesToEnd = () => {
    if (message.command === 'update_chat') {
      if (messagesRef.current) {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    if (message) scrollChatMessagesToEnd();
  }, [viewChat]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  });

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
                <ToYouMessage key={message.id} message={message} />
              )}
            </React.Fragment>
          );
        })}
    </div>
  );
};

export { ChatMessages };
