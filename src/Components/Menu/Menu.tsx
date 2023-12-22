import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import MenuIcon from '@mui/icons-material/Menu'
import ForumIcon from '@mui/icons-material/Forum'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { containerStyles, iconContainerStyles, textItemStyles } from './styles'
import { Avatar, Badge, Grow, Slide, Typography } from '@mui/material'
import { DisplayMode } from '../../Theme/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { isConnected } from '../../store/connection/selector'
import { setActiveSideBar, setShowSideDrawer } from '../../store/sidebar/slice'
import { useGetProfileQuery } from '../../store/api/slice'
import { setActiveProfileUserId } from '../../store/profile/slice'
import { getSideBarPreference } from '../../store/sidebar/selector'
import { setActiveConversation } from '../../store/chats/slice'

interface IMenu {
  displayMode: DisplayMode
  toggleDisplayMode: () => void
}

export const Menu: React.FC<IMenu> = ({
  displayMode,
  toggleDisplayMode,
}: IMenu) => {
  const sideBarPreference = useAppSelector(getSideBarPreference)
  const connected = useAppSelector(isConnected)
  const { isFetching, data } = useGetProfileQuery(undefined)
  const appDispatch = useAppDispatch()

  return (
    <Box sx={containerStyles}>
      <Box sx={iconContainerStyles}>
        <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
          <ForumIcon
            titleAccess="open conversation lists"
            className="main-menu-conversations-joyride"
            onClick={() => {
              if (sideBarPreference === 'mobile')
                appDispatch(setActiveConversation(undefined))
              appDispatch(setActiveSideBar('chats'))
            }}
          />
        </Grow>
      </Box>

      {sideBarPreference === 'mobile' ? (
        <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
          <Box sx={iconContainerStyles}>
            <MenuIcon
              titleAccess="Menu"
              className="menu-joyride"
              onClick={() => {
                appDispatch(setShowSideDrawer(true))
              }}
            />
          </Box>
        </Grow>
      ) : (
        <>
          <Slide direction="left" in mountOnEnter unmountOnExit timeout={500}>
            <Box sx={iconContainerStyles}>
              <Typography variant="subtitle2" sx={textItemStyles}>
                Terms of Use
              </Typography>
            </Box>
          </Slide>
          <Box sx={iconContainerStyles}>
            {displayMode === 'dark' ? (
              <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
                <LightModeIcon
                  titleAccess="Switch to light mode"
                  onClick={toggleDisplayMode}
                  className="main-menu-display-mode-joyride"
                />
              </Grow>
            ) : (
              <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
                <DarkModeIcon
                  color="primary"
                  titleAccess="Switch to dark mode"
                  className="main-menu-display-mode-joyride"
                  onClick={toggleDisplayMode}
                />
              </Grow>
            )}
          </Box>
          <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
            <Box sx={iconContainerStyles}>
              <NotificationsOutlinedIcon titleAccess="Notifications" />
            </Box>
          </Grow>
          <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
            <Box sx={iconContainerStyles}>
              <TuneOutlinedIcon
                titleAccess="Settings"
                className="settings-joyride"
                onClick={() => {
                  appDispatch(setActiveSideBar('setting'))
                }}
              />
            </Box>
          </Grow>
          <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
            <Badge
              overlap="circular"
              color={connected ? 'success' : 'error'}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Box
                sx={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer',
                  },
                }}
              >
                {isFetching || !data ? (
                  <AccountCircleOutlinedIcon titleAccess="Profile picture loading" />
                ) : (
                  <Avatar
                    className="logged-in-profile-avatar"
                    alt={data?.fullname}
                    src={`data:image;base64,${data.profileImg}`}
                    onClick={() => {
                      appDispatch(
                        setActiveProfileUserId({
                          id: data.id,
                          name: data.fullname,
                          isLoggedInUser: true,
                        })
                      )
                      appDispatch(setActiveSideBar('profile'))
                    }}
                    sx={{
                      width: '80%',
                      height: '80%',
                      '&:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  />
                )}
              </Box>
            </Badge>
          </Grow>
        </>
      )}
    </Box>
  )
}
