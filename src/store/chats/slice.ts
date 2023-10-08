import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IChatsState {
  activeChatName: string
}

const initialState: IChatsState = {
  activeChatName: '',
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setActiveChatName: (state, action: PayloadAction<string>) => {
      state.activeChatName = action.payload
    },
  },
})

export const { setActiveChatName } = chatsSlice.actions
export const chatsReducer = chatsSlice.reducer
