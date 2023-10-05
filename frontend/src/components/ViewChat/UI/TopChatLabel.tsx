import React, {FC, useContext} from 'react'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useInterlocutorName } from '../../../hooks/useInterlocutorName'
import { IUser } from '../../../types/typeUser'
import OnlineStatus from '../../GlobalUI/OnlineStatus'
import { getNormalDate } from '../../Chats/UI/DateFunctions'
import { useActions } from '../../../hooks/useActions'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import InterlocutorAvatar from '../../GlobalUI/InterlocutorAvatar'
import { SERVER_URL } from '../../Routing/Routing'

interface ITopChatlabel {
  closeChat: () => void
}

const TopChatLabel: FC<ITopChatlabel> = ({closeChat}) => {
    const {viewChat} = useTypedSelector(state => state)
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
    const interlocutor: IUser = viewChat!.interlocutor1.username === interlocutorName ? viewChat?.interlocutor1! : viewChat?.interlocutor2!

    const {showElement} = useActions()

  return (
    <div className='w-full flex items-center justify-start p-1 md:p-4' style={{backgroundColor: '#1E2B3E'}}>

      <div 
        className='p-2 mx-1 rounded-full active:bg-gray-700 block sm:hidden'
        onClick={() => closeChat()}
      >
        <AiOutlineArrowLeft size={'30px'}/>
      </div>


        <div className='m-1 mr-3 cursor-pointer'>
          <img 
            src={SERVER_URL + '/media/' + interlocutor.avatar} 
            alt="logo" 
            className='rounded-full h-14 w-14 sm:h-16 sm:w-16'
          />
        </div>

      <div className='flex flex-col'>

        <h1 className='text-lg font-bold md:text-2xl'>
          {interlocutorName}
        </h1>
          {interlocutor.is_online ? (
            <div className='flex items-center mt-1'>
              <OnlineStatus/>
              <span className='text-sm ml-1'>
                Online
              </span>
            </div>
          ) : (
            <span className='text-sm text-gray-500'>
                Was online at {getNormalDate(interlocutor.was_online!)}
            </span>
          )}
        </div>

    </div>
  )
}

export {TopChatLabel}
