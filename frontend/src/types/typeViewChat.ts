import { IMessage } from "./typeInstances"

export interface ISendMessageP {
    socket: WebSocket | null
}

export interface IMessageOptions {
    message: IMessage
    socket?: WebSocket | null
}