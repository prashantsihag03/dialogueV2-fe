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

interface CallParticipantData {
  mutedVideo: boolean
  mutedAudio: boolean
}

interface RtcState extends ICall {
  receivingCalls: ReceivingCalls
  suppressNoise: boolean
  /**This is logged in user's preference */
  muteAudio: boolean
  /**This is logged in user's preference */
  muteVideo: boolean
  multipleCameraMode: boolean
  /** This holds all user in the call including logged in user */
  callParticipants: {
    [userId: string]: CallParticipantData
  }
}

const initialState: RtcState = {
  receivingCalls: {},
  call: 'idle',
  userId: null,
  muteAudio: false,
  muteVideo: false,
  suppressNoise: true,
  multipleCameraMode: false,
  callParticipants: {},
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
    addCallParticipant: (
      state,
      action: PayloadAction<{ userId: string; data: CallParticipantData }>
    ) => {
      state.callParticipants[action.payload.userId] = action.payload.data
    },
    clearCallParticipant: (state, action: PayloadAction<void>) => {
      state.callParticipants = {}
    },
    setCallParticipantMutedVideo: (
      state,
      action: PayloadAction<{ userId: string; muteVideo: boolean }>
    ) => {
      if (state.callParticipants[action.payload.userId] == null) {
        console.log(
          'Attempt to update call participant muted video failed as user missing from state',
          action.payload.userId
        )

        return
      }
      state.callParticipants[action.payload.userId].mutedVideo =
        action.payload.muteVideo
    },
    setCallParticipantMutedAudio: (
      state,
      action: PayloadAction<{ userId: string; muteAudio: boolean }>
    ) => {
      if (state.callParticipants[action.payload.userId] == null) {
        console.log(
          'Attempt to update call participant muted audio failed as user missing from state',
          action.payload.userId
        )
        return
      }
      state.callParticipants[action.payload.userId].mutedAudio =
        action.payload.muteAudio
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
  setCallParticipantMutedVideo,
  setCallParticipantMutedAudio,
  addCallParticipant,
  clearCallParticipant,
} = rtcSlice.actions

export const rtcReducer = rtcSlice.reducer
