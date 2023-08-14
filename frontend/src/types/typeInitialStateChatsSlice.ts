import { IChat } from "./typeInstances"

export type TypeInitialChatsSlice = {
    isLoading: boolean
    error: string | undefined
    chatsData: Array<IChat>
}