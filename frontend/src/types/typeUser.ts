import { E164Number } from 'libphonenumber-js/types'

export interface IUser {
    id: number
    username: string
    avatar: string
    phoneNumber: E164Number
}