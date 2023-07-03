import { createSlice } from '@reduxjs/toolkit'

export const addAndEdit = createSlice({
    name: 'addAndEdit',
    initialState: {
        visibility: 'hidden',
        type: '',
        title: '',
        subTitle: '',
        inputTitle: '',
        inputColor: '',
        inputTextarea: '',
    },
    reducers: {
        resetAddAndEdit: (state, action) => {
            state.visibility = 'hidden',
            state.type = ''
            state.title = ''
            state.subTitle = ''
            state.inputTitle = ''
            state.inputColor = ''
            state.inputTextarea = ''
        },
    },
})

export const { example } = addAndEdit.actions

export default addAndEdit.reducer