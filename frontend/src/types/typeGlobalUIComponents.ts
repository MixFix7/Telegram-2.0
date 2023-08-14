import { IChatAndUsername } from "./typeGlobalInterfaces"
import { IChat, IMessage } from "./typeInstances"

export interface IImageUIProps {
    className?: string
    img: string
    alt: string
}

export interface IMessageComponent {
    message: IMessage
}

export interface IInterlocutorUsernameProps 
 extends IChatAndUsername {
    className?: string
}

export interface IInterlocutorAvatarProps
 extends IChatAndUsername {
    className?: string
}

export interface IDispatchMessageDate {
    className?: string
    dispatchDateISO: string
}
