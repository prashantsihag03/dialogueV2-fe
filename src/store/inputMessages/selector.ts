import { RootState } from '..'

export const getInputMessageAttachmentsByConvoId =
  (conversationId: string) => (state: RootState) =>
    state.inputMessages[conversationId]
      ? state.inputMessages[conversationId].attachments
      : []
