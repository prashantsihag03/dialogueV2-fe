/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from 'notistack'

export const RINGING_TIME = 30000 // 30 seconds

interface ReceivingCalls {
  [callerUserId: SnackbarKey]: string
}

export type Call = 'connecting' | 'ringing' | 'receiving' | 'idle' | 'engaged'

interface ICall {
  call: Call
  userId: string | null
}

interface RtcState extends ICall {
  receivingCalls: ReceivingCalls
  suppressNoise: boolean
  muteAudio: boolean
  muteVideo: boolean
  multipleCameraMode: boolean
}

const defaultIce = null

const initialState: RtcState = {
  receivingCalls: {},
  call: 'idle',
  userId: null,
  muteAudio: false,
  muteVideo: false,
  suppressNoise: true,
  multipleCameraMode: false,
}

const rtcSlice = createSlice({
  name: 'rtc',
  initialState: initialState,
  reducers: {
    setCall: (state, action: PayloadAction<ICall>) => {
      state.call = action.payload.call
      state.userId = action.payload.userId
    },
    setReceivingCall: (state, action: PayloadAction<string>) => {
      console.log('Adding new call to receivingCall list')
      const snackbarId = enqueueSnackbar({
        key: `receivingCall-${action.payload}`,
        autoHideDuration: RINGING_TIME + 3000,
        variant: 'callPopUp',
        callId: action.payload,
        snackbarId: `receivingCall-${action.payload}`,
      })
      state.receivingCalls[action.payload] = action.payload
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    removeReceivingCall: (state, action: PayloadAction<SnackbarKey>) => {
      closeSnackbar(action.payload)
      delete state.receivingCalls[
        action.payload.toString().split('receivingCall-')[1]
      ]
    },
    setMuteAudio: (state, action: PayloadAction<boolean>) => {
      state.muteAudio = action.payload
    },
    setMuteVideo: (state, action: PayloadAction<boolean>) => {
      state.muteVideo = action.payload
    },
    setSuppressNoise: (state, action: PayloadAction<boolean>) => {
      state.suppressNoise = action.payload
    },
    setMultipleCameraMode: (state, action: PayloadAction<boolean>) => {
      state.multipleCameraMode = action.payload
    },
  },
})

export const {
  setCall,
  setReceivingCall,
  removeReceivingCall,
  setMuteAudio,
  setMuteVideo,
  setSuppressNoise,
  setMultipleCameraMode,
} = rtcSlice.actions

export const rtcReducer = rtcSlice.reducer
