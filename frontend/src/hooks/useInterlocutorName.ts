import {useContext} from 'react' 
import { AuthContext } from '../components/Authorization/AuthContext'
import { AuthContextType } from '../components/Authorization/types'

export const useInterlocutorName = (interlocutorName1: string | null, interlocutorName2: string | null): [string, string] => {
    const {user} = useContext(AuthContext) as AuthContextType
    const username = user!.username

    let InterlocutorName: string 

    if (interlocutorName1 && interlocutorName2)
        if(interlocutorName1 === username)
            InterlocutorName = interlocutorName2
        else
            InterlocutorName = interlocutorName1
    else 
        InterlocutorName = ''

    return [username, InterlocutorName]
}