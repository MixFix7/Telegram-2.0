import axios from "axios"
import { SERVER_URL } from "../components/Routing/Routing"
import { IAddMessage, IServerMessage } from "../types/typeService"
import { IMessage } from "../types/typeInstances"

class MessageService {
    private accessToken: string = JSON.parse(localStorage.getItem('authTokens')!).access
    private Authorization: {Authorization: string} = {'Authorization': `Bearer ${this.accessToken}`}

    private MESSAGES_URL: string = SERVER_URL + '/api/messages/'

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

    async deleteMessage(id: Pick<IMessage, 'id'>) {
        const response = await axios.post<IServerMessage>(this.MESSAGES_URL + 'delete-message/', 
        {message_id: id.id},
        {headers: this.Authorization})
        return response
    }

    async changeMessage(id: Pick<IMessage, 'id'>, changes: string) {
        const response = await axios.post<IServerMessage>(this.MESSAGES_URL + 'change-message/',
        {
            message_id: id.id, 
            changes: changes
        },
        {headers: this.Authorization})
        return response
    }

    async downloadFile(filePath: string, fileName: string) {
        const response = await axios.get(SERVER_URL + filePath, {
            responseType: 'blob',
        })

        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', fileName)
        link.click()

        window.URL.revokeObjectURL(url)
    
    }}

export {MessageService}