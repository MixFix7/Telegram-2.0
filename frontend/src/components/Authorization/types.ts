import { FormEvent } from 'react';


export type TypeFormData = {
    username: string
    password: string
}

export type AuthContextType = {
    user: string | null
    loginUser: (e: FormEvent<HTMLFormElement>) => Promise<void>
    logoutUser: () => void
    signupUser: (e: FormEvent<HTMLFormElement>) => Promise<void>
    updateTokens: () => Promise<void> 
}