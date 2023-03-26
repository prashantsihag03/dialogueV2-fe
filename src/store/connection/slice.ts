import { createSlice } from '@reduxjs/toolkit'

interface IConnectionState {
  connected: boolean
}

const initialState: IConnectionState = {
  connected: false,
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState: initialState,
  reducers: {
    connected: (state) => {
      state.connected = true
    },
    disconnected: (state) => {
      state.connected = false
    },
  },
})

export const { connected, disconnected } = connectionSlice.actions
export const connectionReducer = connectionSlice.reducer
