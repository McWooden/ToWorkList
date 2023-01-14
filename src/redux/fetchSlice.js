import { createSlice } from '@reduxjs/toolkit'

export const fetchSlice = createSlice({
    name: 'fetch',
    initialState: {
        pathBook: '@me',
        idBook: '@me',
        pathPageOfBook: '',
        idPageOfBook: '',
    },
    reducers: {
        setPathBook: (state, action) => {
            state.pathBook = action.payload.path
            state.idBook = action.payload.id
        },
        setPathPageOfBook: (state, action) => {
            state.pathPageOfBook = action.payload.path
            state.idPageOfBook = action.payload.id
        }
    },
})

// Action creators are generated for each case reducer function
export const { setPathBook, setPathPageOfBook } = fetchSlice.actions

export default fetchSlice.reducer