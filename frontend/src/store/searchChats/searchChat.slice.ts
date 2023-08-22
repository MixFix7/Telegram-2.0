import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Type } from "typescript";

import { IChat } from "../../types/typeInstances";
import { IUser } from "../../types/typeUser";

import { getAllUsers } from "./searchChat.acitons";

interface TypeInitSearchChats {
    searchQuery: IsearchQuery
    chats: IChat[]
    foundedChats: IChat[]
    allUsers: IUser[]
    foundedUsers: IUser[]
    counterFounded: {
        chats: number,
        messages: number,
        users: number,
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
    allUsers: [],
    foundedUsers: [],
    counterFounded: {
        chats: 0,
        messages: 0,
        users: 0,
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
        setAllUsers: (state: TypeInitSearchChats, {payload: allUsers}: PayloadAction<IUser[]>) => {
            state.allUsers = allUsers
        },
        searchChats: (state: TypeInitSearchChats) => {
            const query = state.searchQuery.query;
        
            const foundedChats = state.chats.filter(chat => {
                let messagesMatch = chat.messages?.some(word => word.text?.toLowerCase().includes(query.toLowerCase()));
                let namesMatch1 = chat.interlocutor1?.username.toLowerCase().includes(query.toLowerCase());
                let namesMatch2 = chat.interlocutor2?.username.toLowerCase().includes(query.toLowerCase());
                let namesMatch = namesMatch1 || namesMatch2;
        
                return messagesMatch || namesMatch;
            });
        
            state.foundedChats = foundedChats;
            state.counterFounded.chats = foundedChats.length;
            state.counterFounded.messages = foundedChats.reduce((total, chat) => total + chat.messages.length, 0);
        },
        searchUsers: (state: TypeInitSearchChats) => {
            const query = state.searchQuery.query

            const foundedUsers = state.allUsers.filter(
                (user) => user.username.toLowerCase()
                .includes(query.toLowerCase())
            )

            state.foundedUsers = foundedUsers
            state.counterFounded.users = foundedUsers.length
        }
    },
});
