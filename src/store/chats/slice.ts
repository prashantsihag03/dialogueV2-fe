import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IConversationDetail {
  conversationId: string
  conversationName: string
}

interface IChatsState {
  activeConversation: IConversationDetail | undefined
}

const initialState: IChatsState = {
  activeConversation: undefined,
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setActiveConversation: (
      state,
      action: PayloadAction<IConversationDetail>
    ) => {
      state.activeConversation = action.payload
    },
  },
})

export const { setActiveConversation: setActiveConversation } =
  chatsSlice.actions
export const chatsReducer = chatsSlice.reducer
