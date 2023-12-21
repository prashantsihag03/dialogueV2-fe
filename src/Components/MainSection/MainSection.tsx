import { Box, Slide } from '@mui/material'
import { ChatBox } from '../ChatBox/ChatBox'
import CloseIcon from '@mui/icons-material/Close'
import {
  chatBoxSectionStyles,
  containerStyles,
  sideBarSectionStyles,
} from './styles'
import { Profile } from '../Profile/Profile'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getActiveSideBar,
  getShowSideDrawer,
  getSideBarPreference,
} from '../../store/sidebar/selector'
import Chats from '../Chats'
import Setting from '../Setting'
import { MenuSideBar } from '../Menu/MenuSidebar'
import { setShowSideDrawer } from '../../store/sidebar/slice'

export const MainSection: React.FC = () => {
  const appDispatch = useAppDispatch()
  const sideBarPreference = useAppSelector(getSideBarPreference)
  const activeSideBar = useAppSelector(getActiveSideBar)
  const showSideDrawer = useAppSelector(getShowSideDrawer)

  return (
    <Box sx={containerStyles}>
      <Box
        sx={chatBoxSectionStyles}
        borderRadius={1}
        className="chatbox-joyride"
      >
        <ChatBox />
      </Box>
      {sideBarPreference === 'mobile' ? (
        <Slide direction="left" in={showSideDrawer} mountOnEnter>
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
            <CloseIcon
              titleAccess="Close menu sidebar"
              sx={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
              }}
              onClick={() => {
                appDispatch(setShowSideDrawer(false))
              }}
            />

            {activeSideBar === 'chats' ? <Chats /> : null}
            {activeSideBar === 'profile' ? <Profile /> : null}
            {activeSideBar === 'setting' ? <Setting /> : null}
            {activeSideBar === 'menu' ? <MenuSideBar /> : null}
          </Box>
        </Slide>
      ) : (
        <Box
          sx={sideBarSectionStyles}
          borderRadius={1}
          className="sidebar-joyride"
        >
          {activeSideBar === 'chats' ? <Chats /> : null}
          {activeSideBar === 'profile' ? <Profile /> : null}
          {activeSideBar === 'setting' ? <Setting /> : null}
        </Box>
      )}
    </Box>
  )
}
