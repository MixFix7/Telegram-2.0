import { FormEvent } from 'react';
import { IUser } from './iterfaces';
import { E164Number } from 'libphonenumber-js/types'


export type TypeFormData = {
    username: string
    password: string
}

export type AuthContextType = {
    user: IUser | null
    loginUser: (e: FormEvent<HTMLFormElement>) => Promise<void>
    logoutUser: () => void
    signupUser: (e: FormEvent<HTMLFormElement>, phoneNumber: E164Number) => Promise<void>
    updateTokens: () => Promise<void> 
}