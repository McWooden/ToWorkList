import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage'

const oldState = {book: getLocalStorage('pathBook'), page: getLocalStorage('pathPage')}

export const fetchSlice = createSlice({
    name: 'fetch',
    initialState: {
        pathBook: oldState?.book?.path || '@me',
        idBook: oldState?.book?.id || '@me',
        pathPageOfBook: oldState?.page?.path || '',
        idPageOfBook: oldState?.page?.id || '',
    },
    reducers: {
        setPathBook: (state, action) => {
            setLocalStorage('pathBook', action.payload)
            state.pathBook = action.payload.path
            state.idBook = action.payload.id
        },
        setPathPageOfBook: (state, action) => {
            setLocalStorage('pathPage', action.payload)
            state.pathPageOfBook = action.payload.path
            state.idPageOfBook = action.payload.id
        },
        setFetch: (state, action) => {
            setLocalStorage('pathBook', action.payload)
            state.pathBook = action.payload.path
            state.idBook = action.payload.id
            state.pathPageOfBook = action.payload?.page || action.payload.path
            state.idPageOfBook = action.payload?.idPage || action.payload.id
        },
    },
})

export const { setPathBook, setPathPageOfBook, setFetch } = fetchSlice.actions

export default fetchSlice.reducer