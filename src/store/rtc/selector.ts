import { RootState } from '..'

export const inCall = (state: RootState) => state.rtc.call

export const inCallId = (state: RootState) => state.rtc.userId

export const receivingCalls = (state: RootState) => state.rtc.receivingCalls
