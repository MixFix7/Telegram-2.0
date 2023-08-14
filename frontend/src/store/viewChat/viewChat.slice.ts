import { createSlice } from "@reduxjs/toolkit";
import { IChat } from "../../types/typeInstances";


export const viewChatSlice = createSlice({
    name: 'viewChat',
    initialState: null as IChat | null,
    reducers: {
        selectChat: (state, {payload: chat}) => {
            return chat
        }
    }
})


export const {actions, reducer} = viewChatSlice