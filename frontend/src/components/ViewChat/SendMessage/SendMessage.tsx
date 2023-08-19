import React, { FormEvent, useContext, useState, useEffect } from 'react';  // Додайте useEffect
import { IoMdSend } from 'react-icons/io';
import { SERVER_URL, WEBSOCKET_SERVER_URL } from '../../Routing/Routing';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IChat } from '../../../types/typeInstances';
import { InputMessage } from './UI/InputMessage';
import { useActions } from '../../../hooks/useActions';
import { useInterlocutorName } from '../../../hooks/useInterlocutorName';

const SendMessage = () => {
    const { viewChat } = useTypedSelector(state => state);
    const [chatData, setChatData] = useState<any>(null);
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
    const {url} = useTypedSelector(state => state.websocket)
    const [socket, setSocket] = useState<WebSocket | null>(null)

    const connectToWebsocket = () => {
        const socket = new WebSocket(url!)
        setSocket(socket)
    }

    useEffect(() => {
        console.log(chatData)
    }, [chatData])

    useEffect(() => {
        connectToWebsocket()
    }, [])


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

            } else {
                const data: {message: string} = await response.json()
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
        }
    }


    // const submitFormSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     try {
    //         // Відправка повідомлення через WebSocket
    //             socket!.send(JSON.stringify({
    //                 command: 'send_message',
    //                 sender_username: user!.username,
    //                 recipient_username: viewChat?.interlocutor2.username,
    //                 chat_id: viewChat!.id,
    //                 message_type: 'Text',
    //                 message_content: e.currentTarget.message.value
    //             }));
        
    //         // Очищення поля введення
    //         e.currentTarget.message.value = '';
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    return (
        <form className='w-full p-4 flex items-center'
              style={{ backgroundColor: '#1E2B3E' }}
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
    );
}

export { SendMessage };
