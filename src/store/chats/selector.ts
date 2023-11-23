import { RootState } from '..'

export const getActiveConversation = (state: RootState) =>
  state.chats.activeConversation

export const getConversations = (state: RootState) => state.chats.conversations

export const isConversationsLoading = (state: RootState) =>
  state.chats.conversationsLoading

export const getConversationsError = (state: RootState) =>
  state.chats.conversationsError

export const getShowLatestMsgInView = (state: RootState) =>
  state.chats.showLatestMsgInView

export const getConversationSort = (state: RootState) => state.chats.sort
