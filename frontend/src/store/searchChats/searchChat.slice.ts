import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IChat } from "../../types/typeInstances";

interface TypeInitSearchChats {
    searchQuery: IsearchQuery
    chats: IChat[]
    foundedChats: IChat[]
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
    chats: [],
    foundedChats: [],
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
        setChats: (state: TypeInitSearchChats, {payload: chatsData}: PayloadAction<IChat[]>) => {
            state.chats = chatsData
            state.foundedChats = chatsData
        },
        searchChats: (state: TypeInitSearchChats) => {
            const {query} = state.searchQuery

            const foundedChats = state.chats.filter(chat => {
                let messagesMatch = chat.messages.some(word => word.text?.toLowerCase().includes(query.toLowerCase()))
                let namesMatch1 = chat.interlocutor1.username.toLowerCase().includes(query.toLowerCase())
                let namesMatch2 = chat.interlocutor2.username.toLowerCase().includes(query.toLowerCase())
                let namesMatch = namesMatch1 || namesMatch2

                return messagesMatch || namesMatch

            });

            state.foundedChats = foundedChats
            state.counterFounded.chats = foundedChats.length;
            state.counterFounded.messages = foundedChats.reduce((total, chat) => total + chat.messages.length, 0)
        },
    }
});
