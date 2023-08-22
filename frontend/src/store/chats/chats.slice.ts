import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TypeInitialChatsSlice } from "../../types/typeInitialStateChatsSlice";
import { IChat } from "../../types/typeInstances";

import { getChats } from "./chats.actions";

const initialState: TypeInitialChatsSlice = {
    isLoading: false,
    error: undefined,
    chatsData: []
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        updateChat: (state, {payload: newChat}) => {
            const chatId: number = state.chatsData.findIndex(chat => chat.id === newChat.id)
            if(chatId !== 1) {
                state.chatsData[chatId] = newChat
            }
        },
        startNewChat: (state, {payload: newChat}: PayloadAction<IChat>) => {
            state.chatsData.push(newChat)
        }  
},
    extraReducers: builder => {
        builder
        .addCase(getChats.pending, 
        state => {
            state.isLoading = true
        })
        .addCase(getChats.fulfilled, 
        (state, action) => {
            state.isLoading = false
            state.chatsData = action.payload
        })
        .addCase(getChats.rejected, 
        (state, action) => {
            state.error = action.error.message
            state.chatsData = []
        })
    }

})

export const {actions, reducer} = chatsSlice