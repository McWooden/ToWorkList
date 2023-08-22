import { configureStore } from '@reduxjs/toolkit'
import pathReducer from './fetchSlice'
import sourceReducer from './sourceSlice'
import todoReducer from './todo'
import addAndEditReducer from './addAndEditForGlobalStore'
import summaryReducer from './summaryStore'
import channelReducer from './channelReducer'
import showReducer from './hideAndShowSlice'

export default configureStore({
    reducer: {
        fetch: pathReducer,
        source: sourceReducer,
        todo: todoReducer,
        addAndEdit: addAndEditReducer,
        summary: summaryReducer,
        channel: channelReducer,
        show: showReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})