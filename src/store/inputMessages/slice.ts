import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface InputMessage {
  // text: string
  attachments: File[]
}

interface IInputMessagesState {
  [conversationId: string]: InputMessage
}

const initialState: IInputMessagesState = {}

const inputMessagesSlice = createSlice({
  name: 'inputMessages',
  initialState: initialState,
  reducers: {
    setAttachmentByConvoId: (
      state,
      action: PayloadAction<{ convoId: string; attachments: File[] }>
    ) => {
      return {
        ...state,
        [action.payload.convoId]: {
          ...state[action.payload.convoId],
          attachments: action.payload.attachments,
        },
      }
    },
    addAttachmentByConvoId: (
      state,
      action: PayloadAction<{ convoId: string; attachments: File[] }>
    ) => {
      return {
        ...state,
        [action.payload.convoId]: {
          ...state[action.payload.convoId],
          attachments: [
            ...state[action.payload.convoId].attachments,
            ...action.payload.attachments,
          ],
        },
      }
    },
    removeAllAttachments: (state, action: PayloadAction<string>) => {
      if (!state[action.payload]) {
        return
      }
      state[action.payload].attachments = []
    },
    removeAttachment: (
      state,
      action: PayloadAction<{ convoId: string; indexToRemove: number }>
    ) => {
      if (!state[action.payload.convoId]) return

      const newAttachments = [...state[action.payload.convoId].attachments]
      newAttachments.splice(action.payload.indexToRemove, 1)

      state[action.payload.convoId].attachments = newAttachments
    },
  },
})

export const {
  setAttachmentByConvoId,
  addAttachmentByConvoId,
  removeAllAttachments,
  removeAttachment,
} = inputMessagesSlice.actions
export const inputMessagesReducer = inputMessagesSlice.reducer
