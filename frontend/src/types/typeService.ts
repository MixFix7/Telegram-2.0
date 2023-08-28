export interface InewChatPromise {
    interlocutor1_username: string
    interlocutor2_username: string
}

export interface IAddMessage {
    sender_name: string
    chat_id: number
    message_content: string | null
    files: FileList | null
}

export interface IServerMessage {
    message: string
}