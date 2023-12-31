import { IUser } from "./typeUser"

export interface IMessage {
    id: number
    sender: IUser
    chat: IChat
    dispatch_date: string
    type: string
    isRead: boolean | null
    text?: string | null
    image?: string | null
    file?: string | null
    file_name?: string | null
}

export interface IChat {
    id: number
    interlocutor1 : IUser 
    interlocutor2: IUser
    messages: IMessage[]
    last_message?: IMessage
    unread_messages?: number
}


