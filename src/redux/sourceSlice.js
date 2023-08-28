import { createSlice } from '@reduxjs/toolkit'
import { getLocalAccount, getLocalStorage, getStorage, setLocalStorage, setStorage } from '../utils/localstorage'

export const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        pageType: getStorage('pageType') || 'welcome',
        source: null,
        profile: getLocalAccount(),
        guildProfile: getLocalStorage('guildProfile') ||  null,
        members: null,
        noteEditor: null,
        booksProfile: null,
        pages: null,
    },
    reducers: {
        setPageType: (state, action) => {
            setStorage('pageType', action.payload)
            state.pageType = action.payload
        },
        setPages: (state, action) => {
            state.pages = action.payload
        },
        setSource: (state, action) => {
            state.source = action.payload
        },
        refreshProfile: (state, action) => {
            state.profile = getLocalAccount()
        },
        setGuildProfile: (state, action) => {
            setLocalStorage('guildProfile',action.payload)
            state.guildProfile = action.payload
        },
        setUpdateGuildProfile: (state, action) => {
            state.guildProfile = {...state.guildProfile, ...action.payload}
        },
        setMembers: (state, action) => {
            state.members = action.payload
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

export const { setPageType, setPageDetails, setSource, refreshProfile, setGuildProfile, setMembers, setNoteEditor, setBooksProfile, setJadwalSource, setPages, setUpdateGuildProfile } = sourceSlice.actions

export default sourceSlice.reducer