import { E164Number } from 'libphonenumber-js/types'

export interface IAuthProvider<T> {
    children: T
}

export interface IAuthTokens {
    refresh: string
    access: string
}

export interface IHaveAccount {
    title: string 
    titlePage: string 
    link: string 
    className: string
}

export interface IInputAuth {
    name: string
    nameInput: string
    type: string
}

export interface IUser {
    user_id: number
    username: string
    avatar: string
    isAdmin: boolean
    phone_number: E164Number
    chat_count: number
}