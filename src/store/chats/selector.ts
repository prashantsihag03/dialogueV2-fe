import { RootState } from '..'

export const getActiveConversation = (state: RootState) =>
  state.chats.activeConversation
