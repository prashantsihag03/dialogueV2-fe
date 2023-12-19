/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RtcState {
  call: 'initiating' | 'receiving' | 'idle'
  userId: string | null
}

const defaultIce = null

const initialState: RtcState = {
  call: 'idle',
  userId: null,
}

interface ICall {
  call: 'initiating' | 'receiving' | 'idle'
  userId: string | null
}

const rtcSlice = createSlice({
  name: 'rtc',
  initialState: initialState,
  reducers: {
    setCall: (state, action: PayloadAction<ICall>) => {
      console.log('Setting call to ', action.payload.call)
      state.call = action.payload.call
      state.userId = action.payload.userId
    },
  },
})

export const { setCall } = rtcSlice.actions
export const rtcReducer = rtcSlice.reducer
