import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'
import {
  actionIconStyles,
  actionStyles,
  chatsListStyles,
  containerStyles,
  headingStyles,
} from './styles'
import { ChatQuickView } from '../ChatQuickView/ChatQuickView'
import { IChatQuickView } from '../ChatQuickView/types'

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
  return (
    <Box sx={containerStyles}>
      <Box sx={headingStyles}>
        <Typography sx={{ padding: '0em', fontSize: '30px' }}>
          Messages
        </Typography>
        <Box sx={actionStyles}>
          <SearchIcon fontSize="large" sx={actionIconStyles} />
          <SortIcon fontSize="large" sx={actionIconStyles} />
        </Box>
      </Box>
      <Box sx={chatsListStyles}>
        {chatsInfo.map((chatInfo) => (
          <ChatQuickView key={chatInfo.name} {...chatInfo} />
        ))}
      </Box>
    </Box>
  )
}
