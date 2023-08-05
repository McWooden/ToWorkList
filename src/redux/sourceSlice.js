import { createSlice } from '@reduxjs/toolkit'
import { getLocalAccount } from '../utils/localstorage'

export const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        pageType: 'welcome',
        source: null,
        profile: getLocalAccount(),
        guildProfile: null,
        members: null,
        err: null,
        noteEditor: null,
        booksProfile: null,
        pages: null,
    },
    reducers: {
        setPageType: (state, action) => {
            state.pageType = action.payload
        },
        setPages: (state, action) => {
            state.pages = action.payload
        },
        setSource: (state, action) => {
            state.source = action.payload
        },
        setProfile: (state, action) => {
            state.profile = getLocalAccount()
        },
        setGuildProfile: (state, action) => {
            state.guildProfile = action.payload
        },
        setUpdateGuildProfile: (state, action) => {
            state.guildProfile = {...state.guildProfile, ...action.payload}
        },
        setMembers: (state, action) => {
            state.members = action.payload
        },
        setError: (state, action) => {
            state.err = action.payload
        },
        setNoteEditor: (state, action) => {
            state.noteEditor = action.payload
        },
        setBooksProfile: (state, action) => {
            state.booksProfile = action.payload
        },
        setJadwalSource: (state, action) => {
            state.source.details.jadwal_url = action.payload
        }
    },
})

export const { setPageType, setPageDetails, setSource, setProfile, setGuildProfile, setMembers, setError, setNoteEditor, setBooksProfile, setJadwalSource, setPages, setUpdateGuildProfile } = sourceSlice.actions

export default sourceSlice.reducer