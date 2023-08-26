import { IChatAndUsername } from "./typeGlobalInterfaces"
import { IChat, IMessage } from "./typeInstances"

export interface IImageUIProps {
    className?: string
    img: string
    alt: string
}

export interface IMessageComponent {
    socket?: WebSocket | null
    message: IMessage
}

export interface IInterlocutorUsernameProps {
    className?: string
    interlocutor1Name: string,
    interlocutor2Name: string,
}

export interface IInterlocutorAvatarProps
 extends IChatAndUsername {
    className?: string
}

export interface IDispatchMessageDate {
    className?: string
    dispatchDateISO: string
}
