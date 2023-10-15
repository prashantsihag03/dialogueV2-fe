import { Box } from '@mui/material'
import { ChatBox } from '../ChatBox/ChatBox'
import {
  chatBoxSectionStyles,
  containerStyles,
  sideBarSectionStyles,
} from './styles'
import { Profile } from '../Profile/Profile'
import { useAppSelector } from '../../store/hooks'
import { getActiveSideBar } from '../../store/sidebar/selector'
import Chats from '../Chats'

export const MainSection: React.FC = () => {
  const activeSideBar = useAppSelector(getActiveSideBar)

  return (
    <Box sx={containerStyles}>
      <Box sx={chatBoxSectionStyles} borderRadius={1}>
        <ChatBox />
      </Box>
      <Box sx={sideBarSectionStyles} borderRadius={1}>
        {activeSideBar === 'chats' ? <Chats /> : null}
        {activeSideBar === 'profile' ? <Profile /> : null}
      </Box>
    </Box>
  )
}
