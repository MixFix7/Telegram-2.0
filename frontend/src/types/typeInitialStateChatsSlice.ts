import { IChat } from "./typeChat"

export type TypeInitialChatsSlice = {
    isLoading: boolean
    error: string | undefined
    chatsData: Array<IChat>
}