import { IChat, IMessage } from "./typeInstances"

export interface IImageUIProps {
    className?: string
    img: string
    alt: string
}

export interface IMessageComponent {
    message: IMessage
}

export interface IInterlocutorUsernameProps {
    className?: string
    chat: IChat
    username: string
}

export interface IInterlocutorAvatarProps {
    className?: string
    chat: IChat
    username: string
}

export interface IDispatchMessageDate {
    className?: string
    dispatchDateISO: string
}
