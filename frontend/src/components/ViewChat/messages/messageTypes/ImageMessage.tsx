import React, {FC, useContext, useState} from 'react'
import { IMessageType } from '../../../../types/typeMessages'
import { SERVER_URL } from '../../../Routing/Routing'
import { AuthContext } from '../../../Authorization/AuthContext'
import { AuthContextType } from '../../../Authorization/types'
import ImageModal from './ImageModal'

const ImageMessage: FC<IMessageType> = ({message}) => {
  const {user} = useContext(AuthContext) as AuthContextType
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>  
      <div className={`flex ${message.sender.username === user?.username ? 'justify-end': 'justify-start'}`}>
          <img 
              className='rounded-lg w-2/3 cursor-pointer'
              src={SERVER_URL + message.image}
              alt={message.type}
              onClick={() => setIsOpen(!isOpen)}
          />
      </div>

      {isOpen && 

        <ImageModal 
          imgUrl={SERVER_URL + message.image}
          closeModal={() => setIsOpen(false)}
        />

      }
    </>
  )
}

export default ImageMessage
