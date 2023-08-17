import React, { FormEvent, useContext, useState, useEffect } from 'react';  // Додайте useEffect
import { IoMdSend } from 'react-icons/io';
import { SERVER_URL, WEBSOCKET_SERVER_URL } from '../../Routing/Routing';
import { AuthContext } from '../../Authorization/AuthContext';
import { AuthContextType } from '../../Authorization/types';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { IChat } from '../../../types/typeInstances';
import { InputMessage } from './UI/InputMessage';
import { useActions } from '../../../hooks/useActions';

const SendMessage = () => {
    const { viewChat } = useTypedSelector(state => state);
    const { user } = useContext(AuthContext) as AuthContextType;
    const [chatData, setChatData] = useState<any>(null);
    const {updateChat, selectChat} = useActions()
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        console.log(chatData)
    }, [chatData])

    
    useEffect(() => {
        const roomGroup = `user_${user!.username}`;
        const newSocket = new WebSocket(WEBSOCKET_SERVER_URL + `get-all-user-chats-messages/${user!.username}/`);
        
        newSocket.onopen = () => {
            newSocket.send(JSON.stringify({ command: "subscribe", room: roomGroup }));
        };
    
        newSocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            setChatData(data);
            
            if(data.command === "update_chat") {
                console.log('sdfgsdfg')
                updateChat(data.data)
                selectChat(data.data)
            }
        };

        setSocket(newSocket);  // Зберегти посилання на WebSocket
    }, [user]);  // Виконати підключення при зміні користувача

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
                    'message_content': e.currentTarget.message.value,
                    'sender': user!.username,
                })
            })
            if (response.ok) {
                socket!.send(JSON.stringify({
                command: 'chat_message', 
                message: 'message sent',
                chat_id: viewChat!.id,
                recipient_username: viewChat!.interlocutor1.username === user!.username
                ? viewChat!.interlocutor2.username
                : viewChat!.interlocutor2.username === user!.username
                && viewChat!.interlocutor1.username,
                sender: user!.username,
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
