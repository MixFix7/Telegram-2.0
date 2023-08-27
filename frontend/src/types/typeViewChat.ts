import { IMessage } from "./typeInstances"

export interface ISendMessageP {
    socket: WebSocket | null
}

export interface IMessageOptions {
    message: IMessage
    socket?: WebSocket | null
    isChangeMessage: boolean
    showChangeMessage: (bool: boolean) => void
    changingMessage: string | null | undefined
}