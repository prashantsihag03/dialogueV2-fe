import { Box } from '@mui/system'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { containerStyles, iconContainerStyles, textItemStyles } from './styles'
import { Grow, Slide, Typography } from '@mui/material'
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
      <Slide direction="left" in mountOnEnter unmountOnExit timeout={500}>
        <Box sx={iconContainerStyles}>
          <Typography variant="subtitle1" sx={textItemStyles}>
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
        <Box sx={iconContainerStyles}>
          <AccountCircleOutlinedIcon titleAccess="Profile" />
        </Box>
      </Grow>
    </Box>
  )
}
