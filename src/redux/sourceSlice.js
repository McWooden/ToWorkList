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
        members: null,
        err: null
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
        setMembers: (state, action) => {
            state.members = action.payload
        },
        setError: (state, action) => {
            state.err = action.payload
        }
    },
})

export const { setPageType, setSource, setProfile, setGuildProfile, setMode, setMembers, setError } = sourceSlice.actions

export default sourceSlice.reducer