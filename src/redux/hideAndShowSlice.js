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
            if (state.navbar) {
                state.leftSide = false
                state.rightSide = false
            }
        },
        reverseLeftSide: (state, action) => {
            state.leftSide = !state.leftSide
            state.rightSide = false
        },
        reverseRightSide: (state, action) => {
            state.rightSide = !state.rightSide
            state.leftSide = false
        },
    },
})

export const { reverseNavbar, reverseLeftSide, reverseRightSide } = fetchSlice.actions

export default fetchSlice.reducer