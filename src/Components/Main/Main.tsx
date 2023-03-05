import { Box } from '@mui/material'
import { ChatBox } from '../ChatBox/ChatBox'
import Chats from '../Chats'
import {
  chatBoxSectionStyles,
  containerStyles,
  sideBarSectionStyles,
} from './styles'

export const Main: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Box sx={chatBoxSectionStyles}>
        <ChatBox />
      </Box>
      <Box sx={sideBarSectionStyles}>
        <Chats />
      </Box>
    </Box>
  )
}
