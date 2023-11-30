import { IChatQuickView } from '../Components/ChatQuickView/types'

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

export default sortConvo
