import { createSlice } from '@reduxjs/toolkit'

export const channelStore = createSlice({
    name: 'channel',
    initialState: {
        page: null,
        todoDetail: null,
    },
    reducers: {
        setChannelPage: (state, action) => {
            state.page = action.payload
        },
        setChannelTodoDetail: (state, action) => {
            state.todoDetail = action.payload
        },
    },
})

export const { setChannelPage, setChannelTodoDetail } = channelStore.actions

export default channelStore.reducer