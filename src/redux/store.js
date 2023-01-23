import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './fetchSlice'
import sourceReducer from './sourceSlice'
import todoReducer from './todo'

export default configureStore({
    reducer: {
        fetch: pathReducer,
        source: sourceReducer,
        todo: todoReducer,
    },
})