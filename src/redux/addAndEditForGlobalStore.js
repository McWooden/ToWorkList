import { createSlice } from '@reduxjs/toolkit'

export const addAndEdit = createSlice({
    name: 'addAndEdit',
    initialState: {
        type: '',
        item_title: '',
        desc: '',
        color: '',
        date: '',
        deadline: '',
        _id: '',
    },
    reducers: {
        resetAddAndEdit: (state) => {
            state.type = ''
            state.item_title = ''
            state.desc = ''
            state.color = ''
            state.date = ''
            state.deadline = ''
            state._id = ''
        },
        setAddAndEdit: (state, action) => {
            state.type = action.payload.type
            state.item_title = action.payload.details.item_title
            state.desc = action.payload.details.desc
            state.color = action.payload.details.color
            state.date = action.payload.date
            state.deadline = action.payload.details.deadline
            state._id = action.payload._id || action.payload.id
        }
    },
})

export const { resetAddAndEdit, setAddAndEdit } = addAndEdit.actions

export default addAndEdit.reducer