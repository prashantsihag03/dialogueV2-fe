import { Box } from '@mui/system'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { sideBarActionStyles, sideBarContainerStyles } from './styles'
import { useAppDispatch } from '../../store/hooks'
import CloseIcon from '@mui/icons-material/Close'
import {
  Avatar,
  Grow,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { setActiveSideBar, setShowSideDrawer } from '../../store/sidebar/slice'
import { useGetProfileQuery } from '../../store/api/slice'
import { setActiveProfileUserId } from '../../store/profile/slice'

export const MenuSideBar: React.FC = () => {
  const appDispatch = useAppDispatch()
  const { isFetching, data } = useGetProfileQuery(undefined)

  return (
    <Box sx={sideBarContainerStyles} className="menu-sidebar">
      <Stack
        direction="row"
        width="100%"
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        margin="0.5rem"
      >
        <Typography variant="h2">Menu</Typography>
        <Box sx={sideBarActionStyles}>
          <CloseIcon
            titleAccess="Close menu sidebar"
            onClick={() => {
              appDispatch(setShowSideDrawer(false))
            }}
          />
        </Box>
      </Stack>
      <List sx={{ width: '100%', flex: 1000 }} disablePadding>
        <ListItem disableGutters>
          <ListItemButton
            disabled={data?.id && data?.fullname ? false : true}
            onClick={() => {
              if (data?.id && data?.fullname) {
                appDispatch(
                  setActiveProfileUserId({
                    id: data.id,
                    name: data.fullname,
                    isLoggedInUser: true,
                  })
                )
                appDispatch(setActiveSideBar('profile'))
              }
              appDispatch(setShowSideDrawer(false))
            }}
          >
            <ListItemIcon>
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
                  '&:active': {
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
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              appDispatch(setShowSideDrawer(false))
            }}
          >
            <ListItemIcon>
              <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
                <NotificationsOutlinedIcon titleAccess="Notifications" />
              </Grow>
            </ListItemIcon>
            <ListItemText>Notifications</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton
            onClick={() => {
              appDispatch(setActiveSideBar('setting'))
              appDispatch(setShowSideDrawer(false))
            }}
          >
            <ListItemIcon>
              <TuneOutlinedIcon
                titleAccess="Settings"
                className="settings-joyride"
              />
            </ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton href="/logout">
            <ListItemIcon>
              <LogoutIcon titleAccess="logout" className="logout-joyride" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
