import { createSlice } from '@reduxjs/toolkit'

export const fetchSlice = createSlice({
    name: 'show',
    initialState: {
        navbar: true,
        leftSide: false,
        rightSide: false,
    },
    reducers: {
        reverseNavbar: (state, action) => {
            state.navbar = !state.navbar
        },
        reverseLeftSide: (state, action) => {
            state.leftSide = !state.leftSide
        },
        reverseRightSide: (state, action) => {
            state.rightSide = !state.rightSide
        },
    },
})

export const { reverseNavbar, reverseLeftSide, reverseRightSide } = fetchSlice.actions

export default fetchSlice.reducer