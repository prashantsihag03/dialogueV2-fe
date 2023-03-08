import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import {
  containerStyles,
  iconContainerStyles,
  iconStyles,
  pointerCursor,
} from './styles'
import { Grow, Typography } from '@mui/material'
import { DisplayMode } from '../../Theme/types'

interface IMenu {
  displayMode: DisplayMode
  toggleDisplayMode: () => void
}

export const Menu: React.FC<IMenu> = ({
  displayMode,
  toggleDisplayMode,
}: IMenu) => {
  return (
    <Box sx={containerStyles}>
      <Box sx={iconContainerStyles}>
        <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
          <Typography sx={iconStyles}>Terms of Use</Typography>
        </Grow>
      </Box>
      <Box sx={iconContainerStyles}>
        {displayMode === 'dark' ? (
          <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
            <LightModeIcon
              titleAccess="Switch to light mode"
              onClick={toggleDisplayMode}
              fontSize="large"
              sx={{
                ...pointerCursor,
                ...iconStyles,
                backgroundColor: 'transparent',
              }}
            />
          </Grow>
        ) : (
          <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
            <DarkModeIcon
              color="primary"
              titleAccess="Switch to dark mode"
              onClick={toggleDisplayMode}
              fontSize="large"
              sx={{
                ...pointerCursor,
                ...iconStyles,
                backgroundColor: 'transparent',
              }}
            />
          </Grow>
        )}
      </Box>
      <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
        <Box sx={iconContainerStyles}>
          <NotificationsOutlinedIcon
            sx={iconStyles}
            titleAccess="Notifications"
            fontSize="large"
          />
        </Box>
      </Grow>
      <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
        <Box sx={iconContainerStyles}>
          <TuneOutlinedIcon
            sx={iconStyles}
            titleAccess="Settings"
            fontSize="large"
          />
        </Box>
      </Grow>
      <Box sx={iconContainerStyles}>
        <Grow appear in mountOnEnter unmountOnExit timeout={1000}>
          <AccountCircleOutlinedIcon
            sx={iconStyles}
            titleAccess="Profile"
            fontSize="large"
          />
        </Grow>
      </Box>
    </Box>
  )
}
