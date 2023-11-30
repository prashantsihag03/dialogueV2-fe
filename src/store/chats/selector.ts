import { RootState } from '..'

export const getActiveConversation = (state: RootState) =>
  state.chats.activeConversation

export const isFirstUserSearchResultMounted = (state: RootState) =>
  state.chats.firstUserSearchResultMounted

export const isCreateConvoEnabled = (state: RootState) =>
  state.chats.createConvoEnabled

export const getConversations = (state: RootState) => state.chats.conversations

export const getCreateConvoSearchTerm = (state: RootState) =>
  state.chats.createConvoSearchTerm

export const getShowCreateConvoSearchResult = (state: RootState) =>
  state.chats.showCreateConvoSearchResult

export const getOpenCreateConvoDialog = (state: RootState) =>
  state.chats.openCreateConvoDialog

export const getCreateConvoDialogTransitionEnded = (state: RootState) =>
  state.chats.createConvoDialogTransitionEnded

export const isConversationsLoading = (state: RootState) =>
  state.chats.conversationsLoading

export const getConversationsError = (state: RootState) =>
  state.chats.conversationsError

export const getShowLatestMsgInView = (state: RootState) =>
  state.chats.showLatestMsgInView

export const getConversationSort = (state: RootState) => state.chats.sort

export const getConversationFilteredList = (state: RootState) =>
  state.chats.convoFilteredList
