import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { containerStyles, iconContainerStyles, textItemStyles } from './styles'
import { Avatar, Badge, Grow, Slide, Typography } from '@mui/material'
import { DisplayMode } from '../../Theme/types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { isConnected } from '../../store/connection/selector'
import { setActiveSideBar } from '../../store/sidebar/slice'
import { useGetProfileQuery } from '../../store/api/slice'
import { setActiveProfileUserId } from '../../store/profile/slice'

interface IMenu {
  displayMode: DisplayMode
  toggleDisplayMode: () => void
}

export const Menu: React.FC<IMenu> = ({
  displayMode,
  toggleDisplayMode,
}: IMenu) => {
  const connected = useAppSelector(isConnected)
  const { isFetching, data } = useGetProfileQuery(undefined)
  const appDispatch = useAppDispatch()

  return (
    <Box sx={containerStyles}>
      <Slide direction="left" in mountOnEnter unmountOnExit timeout={500}>
        <Box
          sx={iconContainerStyles}
          onClick={() => {
            appDispatch(setActiveSideBar('chats'))
          }}
        >
          <Typography variant="subtitle2" sx={textItemStyles}>
            Conversations
          </Typography>
        </Box>
      </Slide>
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
            />
          </Grow>
        ) : (
          <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
            <DarkModeIcon
              color="primary"
              titleAccess="Switch to dark mode"
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
          <TuneOutlinedIcon titleAccess="Settings" />
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
                alt={data?.fullname}
                src={data?.profileImgSrc}
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
    </Box>
  )
}
