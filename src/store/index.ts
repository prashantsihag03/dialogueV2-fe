import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/slice'
import { chatsReducer } from './chats/slice'
import { connectionReducer } from './connection/slice'

const rootReducer = combineReducers({
  connection: connectionReducer,
  chats: chatsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
