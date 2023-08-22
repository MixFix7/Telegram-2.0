import React, { FormEvent, useState, useEffect, FC, ChangeEvent } from 'react';
import { IoMdSend } from 'react-icons/io';
import { SERVER_URL, WEBSOCKET_SERVER_URL } from '../../Routing/Routing';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { InputMessage } from './UI/InputMessage';
import { useInterlocutorName } from '../../../hooks/useInterlocutorName';
import { ISendMessageP } from '../../../types/typeViewChat';

const SendMessage: FC<ISendMessageP> = ({socket}) => {

    const { viewChat } = useTypedSelector(state => state);
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
    const [messageContent, setMessageContent] = useState<string>('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageContent(e.target.value)
    }

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
                    'sender_name': username,
                    'chat_id': viewChat!.id,
                    'message_type': 'Text',
                    'message_content': e.currentTarget.message.value,
                })
            })
            if (response.ok) {
                socket!.send(JSON.stringify({
                    command: 'chat_message', 
                    
                    message: 'Message sent',
                    sender_name: username,
                    recipient_name: interlocutorName,
                    chat_id: viewChat!.id,
                }))
                setMessageContent('')

            } else {
                const data: {message: string} = await response.json()
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form className='w-full p-4 flex items-center'
              style={{ backgroundColor: 'rgba(30, 43, 62, 0.8)' }}
              onSubmit={submitFormSendMessage}
        >
            <InputMessage messageContent={messageContent} setMessageContent={onChangeInput}/>
            <button type='submit'>
                <IoMdSend
                    className='text-sky-500 hover:text-sky-600'
                    size={'30px'}
                />
            </button>
        </form>
    );
}

export { SendMessage };
