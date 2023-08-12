import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { chatsSlice } from "./chats/chats.slice";
import { reducer as viewChatReducer } from "./viewChat/viewChat.slice";

const reducers = combineReducers({
    chats: chatsSlice.reducer,
    viewChat: viewChatReducer,
})

export const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>