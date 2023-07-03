import { createSlice } from '@reduxjs/toolkit'

export const addAndEdit = createSlice({
    name: 'addAndEdit',
    initialState: {
        one: '',
        two: '',
    },
    reducers: {
        example: (state, action) => {
            state.one = action.payload.one
            state.two = action.payload.two
        },
    },
})

export const { example } = addAndEdit.actions

export default addAndEdit.reducer