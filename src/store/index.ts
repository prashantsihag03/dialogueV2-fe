import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { connectionReducer } from './connection/slice'

const rootReducer = combineReducers({
  connection: connectionReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
