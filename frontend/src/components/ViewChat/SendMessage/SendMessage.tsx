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
import ClipMessage from './UI/ClipMessage';
import UploadedFiles from './UploadedFiles';

const SendMessage: FC<ISendMessageP> = ({socket}) => {
    const {selectChat, startNewChat} = useActions()
    const messageService = new MessageService()
    const chatService = new ChatService()

    const { viewChat } = useTypedSelector(state => state);
    const [username, interlocutorName] = useInterlocutorName(viewChat!.interlocutor1.username, viewChat!.interlocutor2.username)
    const [messageContent, setMessageContent] = useState<string>('')
    const [uploadedFiles, setUploadedFiles] = useState<FileList | null>()

    const onChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMessageContent(e.target.value)
    }

    const deleteUploadedFile = (fileName: string) => {
        const uploadedFilesWithoutTarget = Array.from(uploadedFiles!).filter(file => file.name !== fileName)
        const dataTransfer = new DataTransfer();
        uploadedFilesWithoutTarget.forEach(file => dataTransfer.items.add(file));

        setUploadedFiles(dataTransfer.files)
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
                    console.log(response)
                    startNewChat(response.data)
                    selectChat(response.data)

                    const data: IAddMessage  = {
                        sender_name: username,
                        chat_id: response.data.id,
                        message_content: messageContent,
                        files: uploadedFiles!,
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
                setUploadedFiles(null)
            })
                })
                
                 
            } else {
                const data: IAddMessage  = {
                    sender_name: username,
                    chat_id: viewChat!.id,
                    message_content: messageContent,
                    files: uploadedFiles!,
                }
                console.log(data)
                const response2 = await messageService.sendMessage(data)
                .then(response2 => {
                    socket!.send(JSON.stringify({
                        command: 'chat_message', 
                        message: 'Message sent',
                        sender_name: username,
                        recipient_name: interlocutorName,
                        chat_id: viewChat!.id,
                    }))
                    console.log(response2.data)
                    setMessageContent('')
                    setUploadedFiles(null)
                })
            }
        
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div 
            className='w-full p-4 items-center'
            style={{ backgroundColor: 'rgba(30, 43, 62, 0.8)' }}
        >
            <form className='w-full flex' encType="multipart/form-data"
                  onSubmit={submitFormSendMessage}
            >
                <ClipMessage 
                    setMessageFiles={(e: ChangeEvent<HTMLInputElement>) => setUploadedFiles(e.target.files)} 
                />
                <InputMessage messageContent={messageContent} setMessageContent={onChangeInput}/>
                <button type='submit'>
                    <IoMdSend
                        className='text-sky-500 hover:text-sky-600'
                        size={'30px'}
                    />
                </button>
            </form>
            {uploadedFiles && 
                <UploadedFiles 
                    uploadedFiles={uploadedFiles!}
                    deleteUploadedFile={deleteUploadedFile}
                />
            }
        </div>
    );
}

export { SendMessage };
