import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../components/Routing/Routing";

const fetchChats = async (username: string) => {
    const token: string = JSON.parse(localStorage.getItem('authTokens')!).access; 
    const response = await fetch(SERVER_URL + '/api/chats/all-user-chats/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({'username': username})
    })
    return response.json()
}

export const getChats = createAsyncThunk('all-chats', 

    async(username: string, thunkApi) => {
        try {
            return await fetchChats(username)
        } catch (error) {
            thunkApi.rejectWithValue({})
        }
    }
)