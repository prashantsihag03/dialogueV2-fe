import { RootState } from '..'

export const getChatsList = (state: RootState) => state.chats.allChats

export const getActiveChatName = (state: RootState) =>
  state.chats.activeChatName
