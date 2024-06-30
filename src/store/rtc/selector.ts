import { RootState } from '..'

export const inCall = (state: RootState) => state.rtc.call

export const inCallId = (state: RootState) => state.rtc.userId

export const receivingCalls = (state: RootState) => state.rtc.receivingCalls

export const suppressNoise = (state: RootState) => state.rtc.suppressNoise

export const muteAudio = (state: RootState) => state.rtc.muteAudio

export const muteVideo = (state: RootState) => state.rtc.muteVideo

export const multipleCameraMode = (state: RootState) =>
  state.rtc.multipleCameraMode
