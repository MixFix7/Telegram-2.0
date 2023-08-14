import React, { FormEvent, useContext } from 'react'
import Font from 'react-font'
import { InputMessage } from './UI/InputMessage'
import {IoMdSend} from 'react-icons/io'
import { SERVER_URL } from '../../Routing/Routing'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { AuthContext } from '../../Authorization/AuthContext'
import { AuthContextType } from '../../Authorization/types'
import { useActions } from '../../../hooks/useActions'

const SendMessage = () => {
    const {viewChat} = useTypedSelector(state => state)
    const {user} = useContext(AuthContext) as AuthContextType
    const {getChats} = useActions()

    const submitFormSendMessage = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const token: string = JSON.parse(localStorage.getItem('authTokens')!).access
            const response = await fetch(SERVER_URL + '/api/messages/send-message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({
                    'sender_username': user!.username,
                    'chat_id': viewChat!.id,
                    'message_type': 'Text',
                    'message_content': e.currentTarget.message.value
                })
            })
            if (response.ok) {
                getChats(user!.username)
            } else {
                const data: {message: string} = await response.json()
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <form className='
            w-full p-4 flex items-center
        '
    style={{backgroundColor: '#1E2B3E'}}
    onSubmit={submitFormSendMessage}
    >
      <InputMessage/>
      <button type='submit'>
        <IoMdSend 
            className='text-sky-500hover:text-sky-600' 
            size={'30px'}
        />
      </button>
    </form>
  )
}

export {SendMessage}
