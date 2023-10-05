import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IshowElementsInitState } from "../types";

const initialState: IshowElementsInitState = {
    viewChatMobile: false,
    showLogout: false,
    NewGroup: false,
    NewChannel: false,
    Contacts: false,    
    Calls: false,
    Saved: false,
    Settings: false,    
} 

export const showElementsSlice = createSlice({
    name: 'showElements',
    initialState,
    reducers: {
        showElement: (state, action: PayloadAction<{ key: keyof IshowElementsInitState }>) => {
            const { key } = action.payload;
            state[key] = !state[key];
        }
    }
})