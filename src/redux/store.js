import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './fetchSlice'
import sourceReducer from './sourceSlice'
import todoReducer from './todo'
import addAndEditReducer from './addAndEditForGlobalStore'
import summaryReducer from './summaryStore'

export default configureStore({
    reducer: {
        fetch: pathReducer,
        source: sourceReducer,
        todo: todoReducer,
        addAndEdit: addAndEditReducer,
        summary: summaryReducer
    },
})