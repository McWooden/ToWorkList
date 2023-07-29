import { createSlice } from '@reduxjs/toolkit'

export const channelStore = createSlice({
    name: 'channel',
    initialState: {
        page: null,
        book: null,
        todoDetail: null,
        todoDetailChat: null,
    },
    reducers: {
        setChannel: (state, action) => {
            state.book = action.payload
        },
        setChannelPage: (state, action) => {
            state.page = action.payload
        },
        setChannelTodoDetail: (state, action) => {
            state.todoDetail = action.payload
        },
        setChannelTodoDetailChat: (state, action) => {
            state.todoDetailChat = action.payload
        },
    },
})

export const { setChannelPage, setChannelTodoDetail, setChannelTodoDetailChat, setChannel } = channelStore.actions

export default channelStore.reducer