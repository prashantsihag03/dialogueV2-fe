import { Box } from '@mui/material'
import { ChatBox } from '../ChatBox/ChatBox'
import Chats from '../Chats'
import {
  chatBoxSectionStyles,
  containerStyles,
  sideBarSectionStyles,
} from './styles'

export const MainSection: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Box sx={chatBoxSectionStyles} borderRadius={1}>
        <ChatBox />
      </Box>
      <Box sx={sideBarSectionStyles} borderRadius={1}>
        <Chats />
      </Box>
    </Box>
  )
}
