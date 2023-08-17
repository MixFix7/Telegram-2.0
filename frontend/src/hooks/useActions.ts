import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import {useDispatch} from 'react-redux'
import * as ChatsSliceActions from '../store/chats/chats.actions'
import {actions as viewChatActions} from '../store/viewChat/viewChat.slice'
import {actions as ChatsSliceActions2} from '../store/chats/chats.slice'

const rootActions = {
    ...ChatsSliceActions,
    ...viewChatActions,
    ...ChatsSliceActions2,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, 
        dispatch), [dispatch])
}
