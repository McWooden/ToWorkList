import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        details: null,
        dones: null,
        notes: null,
        images: null,
        chat: null,
        id: null
    },
    reducers: {
        setTodo: (state, action) => {
            state.details = action.payload.details
            state.dones = action.payload.dones
            state.notes = action.payload.notes
            state.images = action.payload.images
            state.chat = action.payload.chat
        },
        clearTodo: (state, action) => {
            state.details = null
            state.dones = null
            state.notes = null
            state.images = null
            state.chat = null
            state.id = null
        },
        setTodoId: (state, action) => {
            state.id = action.payload
        },
        setAllTodo: (state, action) => {
            state.details = action.payload.details
            state.dones = action.payload.dones
            state.notes = action.payload.notes
            state.images = action.payload.images
            state.chat = action.payload.chat
            state.id = action.payload._id
        },
        setChat: (state, action) => {
            state.chat = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setTodo, clearTodo, setTodoId, setAllTodo, setChat } = todoSlice.actions

export default todoSlice.reducer