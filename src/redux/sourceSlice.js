import { createSlice } from '@reduxjs/toolkit'
import { getLocalAccount } from '../utils/localstorage'

export const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        pageType: 'welcome',
        source: null,
        todo: null,
        profile: getLocalAccount(),
        guildProfile: null,
        chat:null,
    },
    reducers: {
        setPageType: (state, action) => {
            state.pageType = action.payload
        },
        setSource: (state, action) => {
            state.source = action.payload
        },
        setTodo: (state, action) => {
            state.todo = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setGuildProfile: (state, action) => {
            state.guildProfile = action.payload
        },
        setChat: (state, action) => {
            state.chat = action.payload
        },
        addChat: (state, action) => {
            state.chat = state.chat.concat(action.payload)
        }
    },
})

export const { setPageType, setSource, setTodo, setProfile, setGuildProfile, setChat, addChat } = sourceSlice.actions

export default sourceSlice.reducer