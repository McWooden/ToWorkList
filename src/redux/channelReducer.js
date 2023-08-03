import { createSlice } from '@reduxjs/toolkit'

export const channelStore = createSlice({
    name: 'channel',
    initialState: {
        book: null,
    },
    reducers: {
        setChannel: (state, action) => {
            state.book = action.payload
        }
    }
})

export const { setChannel } = channelStore.actions

export default channelStore.reducer