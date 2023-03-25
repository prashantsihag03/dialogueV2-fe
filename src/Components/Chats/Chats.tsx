import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import {
  actionIconStyles,
  actionStyles,
  bottomMenuStyles,
  chatsListStyles,
  containerStyles,
  headingStyles,
} from './styles'
import { ChatQuickView } from '../ChatQuickView/ChatQuickView'
import { IChatQuickView } from '../ChatQuickView/types'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useCallback, useRef } from 'react'

const ChatData: IChatQuickView = {
  name: 'Steve Rogers',
  unseen: 0,
  lastMessage: 'Yes. I told you. Did you even what visi...',
  lastMessageTime: '9:13',
}

const chatsInfo: IChatQuickView[] = []
for (let index = 0; index < 20; index++) {
  chatsInfo.push({ ...ChatData, unseen: index % 2 > 0 ? index : 0 })
}

export const Chats: React.FC = () => {
  const chatsListEleRef = useRef<HTMLDivElement>()

  const scrollClickHandler = useCallback(
    (toTop: boolean) => {
      if (chatsListEleRef && chatsListEleRef.current) {
        chatsListEleRef.current.scrollTo({
          top: toTop ? 0 : chatsListEleRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }
    },
    [chatsListEleRef]
  )

  return (
    <Box sx={containerStyles}>
      <Box sx={headingStyles}>
        <Typography variant="h2">Messages</Typography>
        <Box sx={actionStyles}>
          <SearchIcon sx={actionIconStyles} />
          <SortIcon sx={actionIconStyles} />
        </Box>
      </Box>
      <Box sx={chatsListStyles} component="div" ref={chatsListEleRef}>
        {chatsInfo.map((chatInfo) => (
          <ChatQuickView key={chatInfo.name} {...chatInfo} />
        ))}
      </Box>
      <Box sx={bottomMenuStyles}>
        <KeyboardArrowDownIcon
          onClick={() => {
            scrollClickHandler(false)
          }}
        />
        <KeyboardArrowUpIcon
          onClick={() => {
            scrollClickHandler(true)
          }}
        />
      </Box>
    </Box>
  )
}
