import { Box, Slide, Stack } from '@mui/material'
import { ChatBox } from '../ChatBox/ChatBox'
import { chatBoxSectionStyles, sideBarSectionStyles } from './styles'
import { Profile } from '../Profile/Profile'
import { useAppSelector } from '../../store/hooks'
import {
  getActiveSideBar,
  getShowSideDrawer,
  getSideBarPreference,
} from '../../store/sidebar/selector'
import Chats from '../Chats'
import Setting from '../Setting'
import { MenuSideBar } from '../Menu/MenuSidebar'
import { getActiveConversation } from '../../store/chats/selector'

export const MainSection: React.FC = () => {
  const sideBarPreference = useAppSelector(getSideBarPreference)
  const activeSideBar = useAppSelector(getActiveSideBar)
  const activeConversation = useAppSelector(getActiveConversation)
  const showSideDrawer = useAppSelector(getShowSideDrawer)

  const showChatBox = () => {
    if (sideBarPreference === 'web') return true
    if (
      sideBarPreference === 'mobile' &&
      activeConversation != null &&
      activeSideBar === 'none'
    )
      return true
    return false
  }

  const showSideBar = () => {
    if (sideBarPreference === 'web') return true
    if (sideBarPreference === 'mobile' && activeSideBar != 'none') return true
    if (
      sideBarPreference === 'mobile' &&
      activeSideBar === 'none' &&
      activeConversation == null
    )
      return true
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      width="100%"
      padding={sideBarPreference === 'mobile' ? '0' : '0% 1%'}
      height={sideBarPreference === 'mobile' ? '100%' : '90%'}
      sx={{ backgroundColor: 'transparent' }}
    >
      {showChatBox() ? (
        <Box
          sx={{
            ...chatBoxSectionStyles,
            margin: sideBarPreference === 'mobile' ? '0' : '0% 0.5%',
          }}
          borderRadius={1}
          className="chatbox-joyride"
        >
          <ChatBox />
        </Box>
      ) : null}
      {sideBarPreference === 'mobile' ? (
        <Slide direction="left" in={showSideDrawer} mountOnEnter unmountOnExit>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: 'background.default',
              position: 'absolute',
              top: '0',
              right: '0',
              zIndex: 1000000,
            }}
          >
            <MenuSideBar />
          </Box>
        </Slide>
      ) : null}
      {showSideBar() ? (
        <Box
          sx={{
            ...sideBarSectionStyles,
            maxWidth: sideBarPreference === 'mobile' ? '600px' : '350px',
          }}
          borderRadius={1}
          className="sidebar-joyride"
        >
          {activeSideBar === 'chats' ||
          (activeSideBar === 'none' && activeConversation == null) ? (
            <Chats />
          ) : null}
          {activeSideBar === 'profile' ? <Profile /> : null}
          {activeSideBar === 'setting' ? <Setting /> : null}
        </Box>
      ) : null}
    </Stack>
  )
}
