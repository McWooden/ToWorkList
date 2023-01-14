import { createSlice } from '@reduxjs/toolkit'
import { getLocalAccount } from '../utils/localstorage'

export const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        source: null,
        profile: getLocalAccount(),
        guildProfile: null
    },
    reducers: {
        setSource: (state, action) => {
            state.source = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
        setGuildProfile: (state, action) => {
            state.guildProfile = action.payload
        },
    },
})

export const { setSource, setProfile, setGuildProfile } = sourceSlice.actions

export default sourceSlice.reducer