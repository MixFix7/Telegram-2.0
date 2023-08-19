import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WEBSOCKET_SERVER_URL } from "../../components/Routing/Routing";

interface WebsocketState {
    room: string | null
    url: string | null
    isConnected: boolean;
    message: any;
}

const initialState: WebsocketState = {
    room: null,
    url: null,
    isConnected: false,
    message: null
}

export const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setUrl: (state, action: PayloadAction<string | null>) => {
            state.url = WEBSOCKET_SERVER_URL + action.payload
        },
        setMessage: (state, action: PayloadAction<any>) => {
            state.message = action.payload;
        },
        setRoom: (state, action: PayloadAction<string | null>) => {
            state.room = action.payload
        }
    },
    extraReducers: builder => {
        
    }
})

export const { actions, reducer } = websocketSlice
