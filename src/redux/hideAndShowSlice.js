import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage'

const oldShowNavbarState = Boolean(getLocalStorage('showNavbar')) ?? true

export const fetchSlice = createSlice({
    name: 'show',
    initialState: {
        navbar: oldShowNavbarState,
        leftSide: false,
        rightSide: false,
    },
    reducers: {
        reverseNavbar: (state, action) => {
            setLocalStorage('showNavbar', !state.navbar)
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