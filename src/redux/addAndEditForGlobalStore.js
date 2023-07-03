import { createSlice } from '@reduxjs/toolkit'

export const addAndEdit = createSlice({
    name: 'addAndEdit',
    initialState: {
        type: null,
        item: null
    },
    reducers: {
        resetAddAndEdit: (state) => {
            state.type = null
            state.item = null
        },
        setAddAndEdit: (state, action) => {
            state.type = action.payload.type
            state.item = action.payload.item
        }
    },
})

export const { resetAddAndEdit, setAddAndEdit } = addAndEdit.actions

export default addAndEdit.reducer