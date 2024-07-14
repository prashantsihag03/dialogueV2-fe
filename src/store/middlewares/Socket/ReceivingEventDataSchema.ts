import { z } from 'zod'

export const newConversationEventDataSchema = z.object({
  conversationId: z.string(),
  conversationName: z.string(),
  isGroup: z.boolean(),
  lastMessage: z.string(),
  lastMessageSenderId: z.string(),
  lastMessageTime: z.number(),
  unseen: z.number(),
})
