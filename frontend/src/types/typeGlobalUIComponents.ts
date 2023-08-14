import { IMessage } from "./typeInstances"

export interface IImageUIProps {
    className?: string
    img: string
    alt: string
}

export interface IMessageComponent {
    message: IMessage
}