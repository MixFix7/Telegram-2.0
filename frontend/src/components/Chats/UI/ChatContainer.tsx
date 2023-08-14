import React, {FC, useContext} from 'react'
import { IChat } from '../../../types/typeInstances'
import Image from '../../GlobalUI/Image'
import Font from 'react-font'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface IChatProps {
  chat: IChat
}

export const isToday = (date: string) => {
  const today = new Date()
  const dateTime: Date = new Date(date);
  return (
    dateTime.getUTCFullYear() === today.getUTCFullYear() &&
    dateTime.getUTCMonth() === today.getUTCMonth() &&
    dateTime.getUTCDate() === today.getUTCDate()
  );
};


const getTwoDigitValue = (value: number) => {
  return value < 10 ? `0${value}` : value.toString();
};

export const getNormalDate = (date: string) => {
  const dateTime: Date = new Date(date);

  const year: number = dateTime.getUTCFullYear();
  const month: number = dateTime.getUTCMonth() + 1;
  const day: number = dateTime.getUTCDate();
  const hour: number = dateTime.getUTCHours();
  const minute: number = dateTime.getUTCMinutes();
  const second: number = dateTime.getUTCSeconds();

  const formattedMonth = getTwoDigitValue(month);
  const formattedDay = getTwoDigitValue(day);
  const formattedHour = getTwoDigitValue(hour);
  const formattedMinute = getTwoDigitValue(minute);
  const formattedSecond = getTwoDigitValue(second);

  return `${year}.${formattedMonth}.${formattedDay} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
};

const ChatContainer: FC<IChatProps> = ({chat}) => {
  const {user} = useContext(AuthContext) as AuthContextType
  const {selectChat} = useActions()
  const {viewChat} = useTypedSelector(state => state)
  console.log(viewChat)

  const last_message = chat.last_message.text!
  
  
  const dispatch_date = getNormalDate(chat.last_message.dispatch_date);

  return (
      <div className='
      w-full h-20 bg-transparent flex 
      hover:bg-gray-700 cursor-pointer
      items-center justify-center
      '
      onClick={() => selectChat(chat)}
      >

        <div className='flex items-center justify-center w-1/4'>
          {chat?.interlocutor1.username === user!.username 
              ? (
                <Image
                  className='rounded-full w-16 h-16'
                  img={chat.interlocutor2.avatar}
                  alt={chat.interlocutor2.username}
                />
              )
              : chat?.interlocutor2.username === user!.username 
              && (
                <Image
                  className='rounded-full w-16 h-16'
                  img={chat.interlocutor1.avatar}
                  alt={chat.interlocutor1.username}
                />
              )}
        </div>
        <div className='flex flex-col items-start justify-start w-3/4'>
              <div className='w-full'>
                <Font family='Rubik'>
                  <div className='flex items-center w-full justify-between'>
                    <span
                      className='font-bold text-xl'
                    >
                      {chat.interlocutor1.username === user!.username 
                        ? chat.interlocutor2.username
                        : chat.interlocutor2.username === user!.username 
                        && chat.interlocutor1.username }
                    </span>
                    <span className='text-sm mr-1 text-gray-500'> 
                    {isToday(dispatch_date) ? (
                        dispatch_date.substring(16, 10)
                    ) : (
                      dispatch_date.substring(0, 10)
                    )}
                    </span>
                  </div>
                </Font>
          </div>
          <div className='text-gray-400 flex items-center w-full'>
            <Font family='Rubik'>
              <div className='flex items-center'>

          {chat.last_message.sender.username === user!.username && (
            <span className='mr-1'>You:</span>
            )}
              <p>
                { last_message.length > 19 
                  ? last_message.substring(0, 19) + "..." 
                  : last_message }   
              </p>
                  </div>
            </Font>
          </div>
      </div>
    </div>
  )
}

export default ChatContainer
