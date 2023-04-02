import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { chatsReducer } from './chats/slice'
import { connectionReducer } from './connection/slice'

const rootReducer = combineReducers({
  connection: connectionReducer,
  chats: chatsReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
