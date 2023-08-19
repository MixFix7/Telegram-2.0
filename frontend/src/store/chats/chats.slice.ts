import { createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chats.actions";
import { TypeInitialChatsSlice } from "../../types/typeInitialStateChatsSlice";
import { IChat } from "../../types/typeInstances";

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
            console.log(state.chatsData)
        })
        .addCase(getChats.rejected, 
        (state, action) => {
            state.error = action.error.message
            state.chatsData = []
        })
    }

})

export const {actions, reducer} = chatsSlice