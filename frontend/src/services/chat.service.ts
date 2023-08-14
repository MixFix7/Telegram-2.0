import axios from "axios";
import { IChat } from "../types/typeInstances";
import { SERVER_URL } from "../components/Routing/Routing";

class ChatService {
    async getByIdAndUser(username: string, chat_id: number) {
        return axios.post(SERVER_URL + '/api/chats/all-chats-and-messages/')
    }
}

export {ChatService}