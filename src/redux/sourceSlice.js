import { createSlice } from '@reduxjs/toolkit'
import { getLocalAccount, getLocalStorage, getStorage, setLocalStorage, setStorage } from '../utils/localstorage'

const LocalGuildProfile = getLocalStorage('guildProfile')

export const sourceSlice = createSlice({
    name: 'source',
    initialState: {
        pageType: getStorage('pageType') || 'welcome',
        source: null,
        profile: getLocalAccount(),
        guildProfile: LocalGuildProfile ||  null,
        members: null,
        noteEditor: null,
        roles: [],
        isAdmin: LocalGuildProfile?.isAdmin || false,
        pages: null,
        short: false
    },
    reducers: {
        setShort: (state, action) => {
            state.short = action.payload
        },
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
        setProfie: (state, action) => {
            state.profile = action.payload
        },
        setGuildProfile: (state, action) => {
            setLocalStorage('guildProfile', action.payload)
            state.isAdmin = action.payload?.isAdmin || false
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
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload || false
        }
    },
})

export const { setPageType, setPageDetails, setSource, refreshProfile, setGuildProfile, setMembers, setNoteEditor, setBooksProfile, setJadwalSource, setPages, setUpdateGuildProfile, setIsAdmin, setProfie, setShort } = sourceSlice.actions

export default sourceSlice.reducer