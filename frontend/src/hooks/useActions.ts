import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import {useDispatch} from 'react-redux'
import * as ChatsSliceActions from '../store/chats/chats.actions'
import {actions as viewChatActions} from '../store/viewChat/viewChat.slice'
import {actions as ChatsSliceActions2} from '../store/chats/chats.slice'
import {actions as websocketActions}  from '../store/websocket/websocket.slice'
import { searchChatSlice } from '../store/searchChats/searchChat.slice'

const rootActions = {
    ...ChatsSliceActions,
    ...viewChatActions,
    ...ChatsSliceActions2,
    ...websocketActions,
    ...searchChatSlice.actions,
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => bindActionCreators(rootActions, 
        dispatch), [dispatch])
}
