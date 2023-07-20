import { createSlice } from '@reduxjs/toolkit'

export const summaryStore = createSlice({
    name: 'summary',
    initialState: {
        userId: '',
    },
    reducers: {
        setSummary: (state, action) => {
            state.userId = action.payload
            console.log('SetSummary Triggerd: ', action.payload)
        }
    },
})

export const { setSummary } = summaryStore.actions

export default summaryStore.reducer