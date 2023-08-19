import { configureStore, combineReducers} from "@reduxjs/toolkit";
import { chatsSlice } from "./chats/chats.slice";
import { reducer as viewChatReducer } from "./viewChat/viewChat.slice"; // Змінено імпорт
import { reducer as websocketReducer } from "./websocket/websocket.slice"; // Змінено імпорт

const reducers = combineReducers({
    chats: chatsSlice.reducer,
    viewChat: viewChatReducer,
    websocket: websocketReducer,
});

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>

