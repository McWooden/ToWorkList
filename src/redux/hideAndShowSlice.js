import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage, setLocalStorage } from '../utils/localstorage'

const oldShowNavbarState = Boolean(getLocalStorage('showNavbar')) ?? true

export const fetchSlice = createSlice({
    name: 'show',
    initialState: {
        navbar: oldShowNavbarState,
        leftSide: false,
        rightSide: false,
        iconLeftSide: null,
        iconRightSide: null,
        disableIconLeft: false,
        disableIconRight: false
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
            state.navbar = false
        },
        reverseRightSide: (state, action) => {
            state.rightSide = !state.rightSide
            state.leftSide = false
            state.navbar = false
        },
        setIcon: (state, action) => {
            state.iconLeftSide = action.payload.hasOwnProperty('left') ? action.payload.left : state.iconLeftSide
            state.iconRightSide = action.payload.hasOwnProperty('right') ? action.payload.right : state.iconRightSide
        },
        resetIcon: (state, action) => {
            state.iconLeftSide = null
            state.iconRightSide = null
        },
        disableIcon: (state, action) => {
            state.disableIconLeft = action.payload.hasOwnProperty('left') ? action.payload.left : state.disableIconLeft
            state.disableIconRight = action.payload.hasOwnProperty('right') ? action.payload.right : state.disableIconRight
        }
    },
})

export const { reverseNavbar, reverseLeftSide, reverseRightSide, setIcon, resetIcon, disableIcon } = fetchSlice.actions

export default fetchSlice.reducer