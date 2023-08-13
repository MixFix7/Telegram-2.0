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
    intercolutor1: IUser 
    intercolutor2: IUser
    last_message: IMessage
}
