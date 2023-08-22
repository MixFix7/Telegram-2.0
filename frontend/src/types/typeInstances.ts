import { IUser } from "./typeUser"

export interface IMessage {
    id: number
    sender: IUser
    chat: IChat
    dispatch_date: string
    type: string
    text?: string | null
    image?: string | null
    file?: string | null
}

export interface IChat {
    id: number
    interlocutor1 : IUser 
    interlocutor2: IUser
    messages: IMessage[]
    last_message?: IMessage
}


