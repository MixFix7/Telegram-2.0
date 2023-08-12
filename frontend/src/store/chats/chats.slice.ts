import { createSlice } from "@reduxjs/toolkit";
import { getChats } from "./chats.actions";
import { TypeInitialChatsSlice } from "../../types/typeInitialStateChatsSlice";

const initialState: TypeInitialChatsSlice = {
    isLoading: false,
    error: undefined,
    chatsData: []
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
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
        })
    }

})