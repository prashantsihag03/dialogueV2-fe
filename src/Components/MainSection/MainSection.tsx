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
import Setting from '../Setting'

export const MainSection: React.FC = () => {
  const activeSideBar = useAppSelector(getActiveSideBar)

  return (
    <Box sx={containerStyles}>
      <Box
        sx={chatBoxSectionStyles}
        borderRadius={1}
        className="chatbox-joyride"
      >
        <ChatBox />
      </Box>
      <Box
        sx={sideBarSectionStyles}
        borderRadius={1}
        className="sidebar-joyride"
      >
        {activeSideBar === 'chats' ? <Chats /> : null}
        {activeSideBar === 'profile' ? <Profile /> : null}
        {activeSideBar === 'setting' ? <Setting /> : null}
      </Box>
    </Box>
  )
}
