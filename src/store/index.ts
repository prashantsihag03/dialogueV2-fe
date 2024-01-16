import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/slice'
import { chatsReducer } from './chats/slice'
import { connectionReducer } from './connection/slice'
import { sideBarReducer } from './sidebar/slice'
import { profileReducer } from './profile/slice'
import { socketMiddleware } from './middlewares/socket'
import { io } from 'socket.io-client'
import { onGoingMessagesReducer } from './onGoingMessages/slice'
import { configReducer } from './config/slice'
import { inputMessagesReducer } from './inputMessages/slice'
import { rtcReducer } from './rtc/slice'
import { webrtcMiddleware } from './middlewares/webrtc'
import rtkQueryErrorMiddleware from './middlewares/rtkQueryErrorHandler'

export const rootReducer = combineReducers({
  connection: connectionReducer,
  chats: chatsReducer,
  profile: profileReducer,
  sideBar: sideBarReducer,
  onGoingMessages: onGoingMessagesReducer,
  config: configReducer,
  inputMessages: inputMessagesReducer,
  rtc: rtcReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(rtkQueryErrorMiddleware)
      .concat(apiSlice.middleware)
      .concat(socketMiddleware(io('/', { autoConnect: false })))
      .concat(webrtcMiddleware([])),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
