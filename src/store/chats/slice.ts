import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { getUserConversations } from './thunk'
import { IChatQuickView } from '../../Components/ChatQuickView/types'

interface IConversationDetail {
  conversationId: string
  conversationName: string
  isGroup: boolean
  profileId: string
}

interface IChatsState {
  activeConversation: IConversationDetail | undefined
  showLatestMsgInView: boolean
  conversations: IChatQuickView[]
  conversationsLoading: boolean
  conversationsError: SerializedError | undefined
  sort: 'asc' | 'desc'
}

interface ConversationLastMessage {
  conversationId: string
  lastMessage: string
  lastMessageTime: number
  lastMessageSenderId: string
}

const initialState: IChatsState = {
  activeConversation: undefined,
  showLatestMsgInView: true,
  conversations: [],
  conversationsLoading: true,
  conversationsError: undefined,
  sort: 'desc',
}

const sortConvo = (conversations: IChatQuickView[], sort: 'asc' | 'desc') => {
  const emptyConversations: IChatQuickView[] = []
  const nonEmptyConversations: IChatQuickView[] = []

  conversations.forEach((msg) => {
    if (msg.lastMessageTime != null) {
      nonEmptyConversations.push(msg)
    } else {
      emptyConversations.push(msg)
    }
  })

  let sortedNonEmptyConvos: IChatQuickView[]

  if (sort === 'asc') {
    // earliest message first
    sortedNonEmptyConvos = nonEmptyConversations.sort((a, b) => {
      if (a.lastMessageTime == null || b.lastMessageTime == null) {
        return 0
      }
      return a.lastMessageTime - b.lastMessageTime
    })
  } else {
    sortedNonEmptyConvos = nonEmptyConversations.sort((a, b) => {
      if (a.lastMessageTime == null || b.lastMessageTime == null) {
        return 0
      }
      return b.lastMessageTime - a.lastMessageTime
    })
  }

  return [...sortedNonEmptyConvos, ...emptyConversations]
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setShowLatestMsgInView: (state, action: PayloadAction<boolean>) => {
      state.showLatestMsgInView = action.payload
    },
    setActiveConversation: (
      state,
      action: PayloadAction<IConversationDetail | undefined>
    ) => {
      state.activeConversation = action.payload
    },
    sortConversations: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sort = action.payload
      state.conversations = sortConvo(state.conversations, action.payload)
    },
    updateConversationLastMessage: (
      state,
      action: PayloadAction<ConversationLastMessage>
    ) => {
      const convoIndex = state.conversations.findIndex(
        (convo) => convo.conversationId === action.payload.conversationId
      )

      if (convoIndex === -1) return

      const newConvo = {
        ...state.conversations[convoIndex],
        lastMessage: action.payload.lastMessage,
        lastMessageTime: action.payload.lastMessageTime,
        lastMessageSenderId: action.payload.lastMessageSenderId,
      }

      const newList = state.conversations
      newList[convoIndex] = newConvo

      state.conversations = sortConvo(newList, state.sort)
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserConversations.fulfilled, (state, { payload }) => {
      state.conversations = payload
      state.conversationsLoading = false
      state.conversationsError = undefined
    })
    builder.addCase(getUserConversations.rejected, (state, { error }) => {
      state.conversations = []
      state.conversationsLoading = false
      state.conversationsError = error
    })
    builder.addCase(getUserConversations.pending, (state) => {
      state.conversations = []
      state.conversationsLoading = true
      state.conversationsError = undefined
    })
  },
})

export const {
  sortConversations,
  setActiveConversation: setActiveConversation,
  updateConversationLastMessage: updateConversationLastMessage,
  setShowLatestMsgInView: setShowLatestMsgInView,
} = chatsSlice.actions
export const chatsReducer = chatsSlice.reducer
