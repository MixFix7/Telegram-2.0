import { createAsyncThunk } from "@reduxjs/toolkit";
import { SERVER_URL } from "../../components/Routing/Routing";

const fetchAllUsers = async (username: string) => {
    const token: string = JSON.parse(localStorage.getItem('authTokens')!).access
    const response = await fetch(SERVER_URL + '/api/chats/all-users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
            'username': username
        })
    })

    return await response.json()
}

export const getAllUsers = createAsyncThunk('all-users', 
    async(username: string, thunkApi) => {
        try {
            return await fetchAllUsers(username)
        } catch (error) {
            thunkApi.rejectWithValue({})
        }
    }
)