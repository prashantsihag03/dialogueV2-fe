import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { getUserConversations } from './thunk'
import { IChatQuickView } from '../../Components/ChatQuickView/types'
import sortConvo from '../../utils/convo-utils'

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
  convoFilteredList: IChatQuickView[]
  conversationsLoading: boolean
  conversationsError: SerializedError | undefined
  sort: 'asc' | 'desc'
  openCreateConvoDialog: boolean
  createConvoDialogTransitionEnded: boolean
  createConvoSearchTerm: string
  showCreateConvoSearchResult: boolean
  firstUserSearchResultMounted: boolean
  createConvoEnabled: boolean
  draggingFiles: boolean
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
  convoFilteredList: [],
  conversationsLoading: true,
  conversationsError: undefined,
  sort: 'desc',
  // create conversation dialog state
  openCreateConvoDialog: false,
  createConvoDialogTransitionEnded: false,
  createConvoSearchTerm: '',
  showCreateConvoSearchResult: false,
  firstUserSearchResultMounted: false,
  createConvoEnabled: false,
  // message box
  draggingFiles: false,
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setDraggingFiles: (state, action: PayloadAction<boolean>) => {
      state.draggingFiles = action.payload
    },
    setFirstUserSearchResultMounted: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.firstUserSearchResultMounted = action.payload
    },
    setCreateConvoSearchTerm: (state, action: PayloadAction<string>) => {
      state.createConvoSearchTerm = action.payload
    },
    setCreateConvoEnabled: (state, action: PayloadAction<boolean>) => {
      state.createConvoEnabled = action.payload
    },
    setShowCreateConvoSearchResult: (state, action: PayloadAction<boolean>) => {
      state.showCreateConvoSearchResult = action.payload
    },
    setShowLatestMsgInView: (state, action: PayloadAction<boolean>) => {
      state.showLatestMsgInView = action.payload
    },
    setActiveConversation: (
      state,
      action: PayloadAction<IConversationDetail | undefined>
    ) => {
      if (action.payload == undefined) {
        state.activeConversation = action.payload
      }
      const convo = state.conversations.find(
        (convo) => convo.conversationId === action.payload?.conversationId
      )
      if (!convo) return
      state.activeConversation = action.payload
    },
    setActiveConversationByName: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      const convo = state.conversations.find(
        (convo) => convo.conversationName === action.payload
      )
      if (!convo) return
      state.activeConversation = {
        conversationId: convo.conversationId,
        conversationName: convo.conversationName,
        isGroup: convo.isGroup,
        profileId: convo.isGroup
          ? convo.conversationId
          : convo.conversationName,
      }
    },
    sortConversations: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sort = action.payload
      state.conversations = sortConvo(state.conversations, action.payload)
    },
    filterConversationList: (state, action: PayloadAction<string>) => {
      const filteredConvo = state.conversations.filter((convo) =>
        convo.conversationName.includes(action.payload)
      )
      state.convoFilteredList = filteredConvo
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
    setOpenCreateConvoDialog: (state, action: PayloadAction<boolean>) => {
      state.openCreateConvoDialog = action.payload
      if (!action.payload) {
        state.createConvoDialogTransitionEnded = false
      }
    },
    setCreateConvoDialogTransitionEnded: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.createConvoDialogTransitionEnded = action.payload
    },
    addConversation: (state, action: PayloadAction<IChatQuickView>) => {
      state.conversations.push(action.payload)
      state.conversations = sortConvo(state.conversations, state.sort)
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
  setActiveConversationByName,
  setDraggingFiles,
  setFirstUserSearchResultMounted,
  setCreateConvoEnabled,
  setCreateConvoSearchTerm,
  setShowCreateConvoSearchResult,
  sortConversations,
  setOpenCreateConvoDialog,
  setCreateConvoDialogTransitionEnded,
  filterConversationList,
  setActiveConversation,
  updateConversationLastMessage,
  setShowLatestMsgInView,
  addConversation,
} = chatsSlice.actions

export const chatsReducer = chatsSlice.reducer
