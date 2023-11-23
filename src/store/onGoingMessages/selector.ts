import { RootState } from '..'

export const getOngoingMessagesByConversationId =
  (conversationId: string) => (state: RootState) => {
    if (state.onGoingMessages[conversationId]) {
      return state.onGoingMessages[conversationId]
    }
    return undefined
  }
