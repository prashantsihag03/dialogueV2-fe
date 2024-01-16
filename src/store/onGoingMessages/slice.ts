import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessagePostResult } from '../api/slice'

export type MessageStatus = 'sent' | 'pending' | 'failed'

export interface OngoingMessageValue extends MessagePostResult {
  status: MessageStatus
}

export interface OngoingMessageStatusFailedPayload {
  status: MessageStatus
  conversationId: string
  localMessageId: string
}

interface OngoingMessages {
  [conversationId: string]: OngoingMessageValue[]
}

const initialState: OngoingMessages = {}

const onGoingMessagesSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    createEmptyConversation: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        [action.payload]: [],
      }
    },
    addOngoingMessage: (state, action: PayloadAction<OngoingMessageValue>) => {
      if (!state[action.payload.conversationId]) {
        return {
          ...state,
          [action.payload.conversationId]: [action.payload],
        }
      }
      // messages for this conversationId already exists in state
      const updatedMsgList = [...state[action.payload.conversationId]]
      updatedMsgList.push(action.payload)

      return {
        ...state,
        [action.payload.conversationId]: updatedMsgList,
      }
    },
    addOngoingMessages: (
      state,
      action: PayloadAction<OngoingMessageValue[]>
    ) => {
      // if conversation doesnt exists, create it and push message
      if (!state[action.payload[0].conversationId]) {
        // this conversationId doesnt exists in state
        return {
          ...state,
          [action.payload[0].conversationId]: action.payload,
        }
      }
      // messages for this conversationId already exists in state
      const updatedMsgList = [...state[action.payload[0].conversationId]]
      updatedMsgList.concat(action.payload)
      return {
        ...state,
        [action.payload[0].conversationId]: updatedMsgList,
      }
    },
    removeOngoingMessages: (state, action: PayloadAction<string>) => {
      if (!state[action.payload]) {
        return state
      }
      return {
        ...state,
        [action.payload]: [],
      }
    },
    updateOngoingMessageStatusToSent: (
      state,
      action: PayloadAction<OngoingMessageValue>
    ) => {
      // this conversationId doesnt exists in state
      if (!state[action.payload.conversationId]) {
        return state
      }

      const ongoingMessageIndex = state[
        action.payload.conversationId
      ].findIndex((msg) => msg.localMessageId === action.payload.localMessageId)

      if (ongoingMessageIndex === -1) {
        return state
      }

      // messages for this conversationId already exists in state
      state[action.payload.conversationId][ongoingMessageIndex] = action.payload
    },
    updateOngoingMessageStatusToFailed: (
      state,
      action: PayloadAction<OngoingMessageStatusFailedPayload>
    ) => {
      // this conversationId doesnt exists in state
      if (!state[action.payload.conversationId]) {
        return state
      }

      const ongoingMessageIndex = state[
        action.payload.conversationId
      ].findIndex((msg) => msg.localMessageId === action.payload.localMessageId)

      if (ongoingMessageIndex === -1) {
        return state
      }

      // messages for this conversationId already exists in state
      const updatedMsgList = [...state[action.payload.conversationId]]
      updatedMsgList[ongoingMessageIndex] = {
        ...updatedMsgList[ongoingMessageIndex],
        status: 'failed',
      }
      return {
        ...state,
        [action.payload.conversationId]: updatedMsgList,
      }
    },
  },
})

export const {
  createEmptyConversation,
  addOngoingMessage: addOngoingMessage,
  addOngoingMessages: addOngoingMessages,
  removeOngoingMessages,
  updateOngoingMessageStatusToSent: updateOngoingMessageStatusToSent,
  updateOngoingMessageStatusToFailed: updateOngoingMessageStatusToFailed,
} = onGoingMessagesSlice.actions
export const onGoingMessagesReducer = onGoingMessagesSlice.reducer
