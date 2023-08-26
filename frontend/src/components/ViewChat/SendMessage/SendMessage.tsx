import React, { FormEvent, useState, useEffect, FC, ChangeEvent } from 'react';
import { IoMdSend } from 'react-icons/io';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { InputMessage } from './UI/InputMessage';
import { useInterlocutorName } from '../../../hooks/useInterlocutorName';
import { ISendMessageP } from '../../../types/typeViewChat';
import { useActions } from '../../../hooks/useActions';
import { ChatService } from '../../../services/chat.service';
import { IAddMessage } from '../../../types/typeService';
import { MessageService } from '../../../services/message.service';

const SendMessage: FC<ISendMessageP> = ({socket}) => {
    const {selectChat, startNewChat} = useActions()
    const messageService = new MessageService()
    const chatService = new ChatService()

    const { viewChat } = useTypedSelector(state => state);
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
    const [messageContent, setMessageContent] = useState<string>('')

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageContent(e.target.value)
    }

    const submitFormSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const message: string = e.currentTarget.message.value
            if (viewChat!.messages.length === 0) {
                const response = await chatService.createNewChat(
                    viewChat!.interlocutor1.username,
                    viewChat!.interlocutor2.username,
                )
                .then(response => {
                    startNewChat(response.data)
                    selectChat(response.data)

                    const data: IAddMessage  = {
                        sender_name: username,
                        chat_id: response.data.id,
                        message_type: 'Text',
                        message_content: message
                    }

                    const response2 = messageService.sendMessage(data)
                    .then(response2 => {
                        socket!.send(JSON.stringify({
                        command: 'chat_message', 
                        message: 'Message sent',
                        sender_name: username,
                        recipient_name: interlocutorName,
                        chat_id: response.data.id,
                }))
                setMessageContent('')
            })
                })
                
                 
            } else {
                const data: IAddMessage  = {
                    sender_name: username,
                    chat_id: viewChat!.id,
                    message_type: 'Text',
                    message_content: message
                }
                const response2 = await messageService.sendMessage(data)
                .then(response2 => {
                    socket!.send(JSON.stringify({
                        command: 'chat_message', 
                        message: 'Message sent',
                        sender_name: username,
                        recipient_name: interlocutorName,
                        chat_id: viewChat!.id,
                    }))
                    setMessageContent('')
                })
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
