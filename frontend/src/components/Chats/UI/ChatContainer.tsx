import React, {FC, useContext} from 'react'
import { IChat } from '../../../types/typeChat'
import Image from '../../GlobalUI/Image'
import Font from 'react-font'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'


  interface IChatProps {
    chat: IChat
  }

  const ChatContainer: FC<IChatProps> = ({chat}) => {
  const {user} = useContext(AuthContext) as AuthContextType

  const last_message = chat.last_message.text!
  
  const getTwoDigitValue = (value: number) => {
    return value < 10 ? `0${value}` : value.toString();
  };
  
  const getNormalDate = (date: string) => {
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
  
  const dispatch_date = getNormalDate(chat.last_message.dispatch_date);

  return (
    <div className='
        w-full h-20 bg-transparent flex 
        hover:bg-gray-700 cursor-pointer
        items-center justify-center
    '
    >
      <div className='flex items-center justify-center w-1/4'>
          <Image
            className='rounded-full w-16 h-16'
            img={chat.interlocutor2.avatar}
            alt={chat.interlocutor2.username}
          />
      </div>
      <div className='flex flex-col items-start justify-start w-3/4'>
            <div className='w-full'>
              <Font family='Rubik'>
                <div className='flex items-center w-full'>
                  <span
                    className='font-bold text-xl'
                  >
                    {chat.interlocutor2.username}
                  </span>
                  <span className='relative left-14  text-sm text-gray-500'>
                      {dispatch_date.substring(0, 10)}
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
