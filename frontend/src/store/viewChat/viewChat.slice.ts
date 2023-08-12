import { createSlice } from "@reduxjs/toolkit";

const viewChatSlice = createSlice({
    name: 'viewChat',
    initialState: null,
    reducers: {
        selectChat: (state, {payload: chat}) => {
            return chat
        } 
    }
})

export const {actions, reducer} = viewChatSlice