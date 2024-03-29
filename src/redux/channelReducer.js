import { createSlice } from '@reduxjs/toolkit'
import supabase from '../utils/supabase'
import { getLocalStorage } from '../utils/localstorage'

const data = getLocalStorage('pathBook')


export const channelStore = createSlice({
    name: 'channel',
    initialState: {
        book: supabase.channel(data?.id||'') || null,
    },
    reducers: {
        setChannel: (state, action) => {
            state.book = action.payload
        }
    }
})

export const { setChannel } = channelStore.actions

export default channelStore.reducer