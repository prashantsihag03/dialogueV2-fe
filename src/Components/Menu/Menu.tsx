import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { containerStyles, iconContainerStyles, pointerCursor } from './styles'
import { Typography, Zoom } from '@mui/material'
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
        <Zoom in mountOnEnter unmountOnExit>
          <Typography>Terms of Use</Typography>
        </Zoom>
      </Box>
      <Box sx={iconContainerStyles}>
        {displayMode === 'dark' ? (
          <Zoom in mountOnEnter unmountOnExit>
            <LightModeIcon
              titleAccess="Switch to light mode"
              onClick={toggleDisplayMode}
              fontSize="large"
              sx={pointerCursor}
            />
          </Zoom>
        ) : (
          <Zoom in mountOnEnter unmountOnExit>
            <DarkModeIcon
              color="primary"
              titleAccess="Switch to dark mode"
              onClick={toggleDisplayMode}
              fontSize="large"
              sx={pointerCursor}
            />
          </Zoom>
        )}
      </Box>
      <Box sx={iconContainerStyles}>
        <Zoom in mountOnEnter unmountOnExit>
          <NotificationsOutlinedIcon
            titleAccess="Notifications"
            fontSize="large"
          />
        </Zoom>
      </Box>
      <Zoom in mountOnEnter unmountOnExit>
        <Box sx={iconContainerStyles}>
          <TuneOutlinedIcon titleAccess="Settings" fontSize="large" />
        </Box>
      </Zoom>
      <Box sx={iconContainerStyles}>
        <Zoom in mountOnEnter unmountOnExit>
          <AccountCircleOutlinedIcon titleAccess="Profile" fontSize="large" />
        </Zoom>
      </Box>
    </Box>
  )
}
