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
            const { type, details = {}, date, _id, id } = action.payload
            state.type = type || ''
            state.item_title = details.item_title || ''
            state.desc = details.desc || ''
            state.color = details.color || ''
            state.date = date || ''
            state.deadline = details.deadline || ''
            state._id = _id || id || ''
        }        
    },
})

export const { resetAddAndEdit, setAddAndEdit } = addAndEdit.actions

export default addAndEdit.reducer