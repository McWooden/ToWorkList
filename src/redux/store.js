import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './fetchSlice'
import sourceReducer from './sourceSlice'

export default configureStore({
    reducer: {
        fetch: pathReducer,
        source: sourceReducer,
    },
})