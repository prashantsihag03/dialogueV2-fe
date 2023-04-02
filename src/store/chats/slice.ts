import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatQuickView } from '../../Components/ChatQuickView/types'

interface IChatsState {
  allChats: IChatQuickView[]
  activeChatName: string
}

const demoList = []
const demoChatData: IChatQuickView = {
  name: 'Steve Rogers',
  unseen: 0,
  lastMessage: 'Yes. I told you. Did you even what visi...',
  lastMessageTime: '9:13',
}

const ChatNames = [
  'Pepper Potts',
  'Avengers',
  'Steve Rogers',
  'Rhody',
  'Natasha Romanoff',
  'Bruce Banner',
  'Fury',
  'SHIELD',
  'Peter Parker',
  'Clint Barton',
  'Thor Odinson',
  'Scott Lang',
  'Carol Denvers',
  'Sam Wilson',
  "T'Challa",
  'Shuri',
  'Reed Richards',
  'Sue Storm',
  'Ratchet',
  'Mr. Lord',
]

for (let index = 0; index < 20; index++) {
  demoList.push({
    ...demoChatData,
    unseen: index % 2 > 0 ? index : 0,
    name: ChatNames[index],
  })
}

const initialState: IChatsState = {
  allChats: demoList,
  activeChatName: '',
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialState,
  reducers: {
    setActiveChatName: (state, action: PayloadAction<string>) => {
      const isChatNameValid = state.allChats.find(
        (chat) => chat.name === action.payload
      )
      if (isChatNameValid) state.activeChatName = action.payload
    },
  },
})

export const { setActiveChatName } = chatsSlice.actions
export const chatsReducer = chatsSlice.reducer
