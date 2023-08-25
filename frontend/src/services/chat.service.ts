import axios from "axios";

import { IChat } from "../types/typeInstances";
import { IUser } from "../types/typeUser";
import { SERVER_URL } from "../components/Routing/Routing";
import { IAddMessage, InewChatPromise } from "../types/typeService";

class ChatService {
    private accessToken: string = JSON.parse(localStorage.getItem('authTokens')!).access
    private Authorization: {Authorization: string} = {'Authorization': `Bearer ${this.accessToken}`}

    private CHATS_URL: string = SERVER_URL + '/api/chats/'
    private MESSAGES_URL: string = SERVER_URL + '/api/messages/'

    async getAllUsers(username: string) {
        const response = await axios.post<IUser[]>(this.CHATS_URL + 'all-users/', 
        {username: username},
        {headers: this.Authorization})
        return response
    }
    
    async createNewChat(inlName1: string, inlName2: string) {
        const response = await axios.post<IChat>(this.CHATS_URL + 'start-new-chat/',
        { interlocutor1_username: inlName1, interlocutor2_username: inlName2 },
        { headers: this.Authorization })
        return response
    }
    
    async sendMessage(data: IAddMessage) {
        const response = await axios.post<IAddMessage>(this.MESSAGES_URL + 'send-message/', 
        { 
            chat_id: data.chat_id,
            sender_name: data.sender_name,
            message_type: data.message_type,
            message_content: data.message_content,
        },
        {headers: this.Authorization})
        return response
    }
}

export {ChatService}