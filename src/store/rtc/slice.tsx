/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from 'notistack'

interface ReceivingCalls {
  [callerUserId: SnackbarKey]: string
}

export type Call = 'initiating' | 'receiving' | 'idle' | 'in-call'

interface ICall {
  call: Call
  userId: string | null
}

interface RtcState extends ICall {
  receivingCalls: ReceivingCalls
}

const defaultIce = null

const initialState: RtcState = {
  receivingCalls: {},
  call: 'idle',
  userId: null,
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
        autoHideDuration: 15000,
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
  },
})

export const { setCall, setReceivingCall, removeReceivingCall } =
  rtcSlice.actions
export const rtcReducer = rtcSlice.reducer
