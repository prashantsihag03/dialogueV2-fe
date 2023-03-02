import { Box } from '@mui/material'
import { ChatBox } from '../ChatBox/ChatBox'
import {
  chatBoxSectionStyles,
  containerStyles,
  sectionStyles,
  sideBarSectionStyles,
} from './styles'

export const Main: React.FC = () => {
  return (
    <Box sx={containerStyles}>
      <Box sx={{ ...sectionStyles, ...chatBoxSectionStyles }}>
        <ChatBox />
      </Box>
      <Box sx={{ ...sectionStyles, ...sideBarSectionStyles }}>
        <ChatBox />
      </Box>
    </Box>
  )
}
