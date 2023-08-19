import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChat, IMessage } from "../../types/typeInstances";

interface TypeInitSearchChats {
    searchQuery: IsearchQuery
    chats: IChat[] | null
    foundedChats: IChat[] | null
    counterFounded: {
        chats: number,
        messages: number,
    }
}

interface IsearchQuery {
    query: string,
    username: string
}

const initialState: TypeInitSearchChats = {
    searchQuery: {
        query: '',
        username: '',
    },
    chats: null,
    foundedChats: null,
    counterFounded: {
        chats: 0,
        messages: 0
    }
}

export const searchChatSlice = createSlice({
    name: 'searchChats',
    initialState,
    reducers: {
        setSearchQuery: (state: TypeInitSearchChats, {payload: searchQuery}: PayloadAction<IsearchQuery>) => {
            state.searchQuery.query = searchQuery.query
            state.searchQuery.username = searchQuery.username
        },
        seatchChats: (state: TypeInitSearchChats) => {
            const {query} = state.searchQuery
            const chatsArray =  state.chats


            const foundedChats = chatsArray!.filter(chat => {
                let messagesMatch = chat.messages.some(word => word.text?.toLowerCase() === query.toLowerCase())
                let namesMatch1 = chat.interlocutor1.username.toLowerCase().includes(query.toLowerCase())
                let namesMatch2 = chat.interlocutor2.username.toLowerCase().includes(query.toLowerCase())
                let namesMatch = namesMatch1 || namesMatch2

                if (query.length !== 0)
                    return messagesMatch || namesMatch
                else
                    return true
            });

            state.foundedChats = foundedChats;
            state.counterFounded.chats = foundedChats.length;
            state.counterFounded.messages = foundedChats.reduce((total, chat) => total + chat.messages.length, 0)
        },
    }
});
