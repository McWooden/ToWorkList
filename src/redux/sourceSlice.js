import { createSlice } from '@reduxjs/toolkit'
import { getLocalAccount } from '../utils/localstorage'

export const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        pageType: 'welcome',
        source: null,
        profile: getLocalAccount(),
        guildProfile: null,
        mode: 'dark',
    },
    reducers: {
        setPageType: (state, action) => {
            state.pageType = action.payload
        },
        setSource: (state, action) => {
            state.source = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setGuildProfile: (state, action) => {
            state.guildProfile = action.payload
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
    },
})

export const { setPageType, setSource, setProfile, setGuildProfile, setMode } = sourceSlice.actions

export default sourceSlice.reducer