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