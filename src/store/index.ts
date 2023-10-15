import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/slice'
import { chatsReducer } from './chats/slice'
import { connectionReducer } from './connection/slice'
import { sideBarReducer } from './sidebar/slice'
import { profileReducer } from './profile/slice'

export const rootReducer = combineReducers({
  connection: connectionReducer,
  chats: chatsReducer,
  profile: profileReducer,
  sideBar: sideBarReducer,
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
