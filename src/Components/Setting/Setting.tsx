import { Box, List, Typography } from '@mui/material'
import { containerStyles, headingStyles } from './styles'
import SwitchSetting from './SwitchSetting'
import KeyboardIcon from '@mui/icons-material/Keyboard'
import TourIcon from '@mui/icons-material/Tour'
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser'

const Setting: React.FC = () => {
  return (
    <Box sx={containerStyles} className="setting-sidebar">
      <Box sx={headingStyles}>
        <Typography variant="h2">Settings</Typography>
      </Box>
      <List sx={{ width: '100%', padding: '1rem 0' }} dense>
        <SwitchSetting
          settingKey="enterSendsMessage"
          settingKeyDisplayName="Enter sends message"
          note="Enter key will send the typed message."
          icon={<KeyboardIcon fontSize="medium" />}
        />
        <SwitchSetting
          settingKey="greetMeEverytime"
          settingKeyDisplayName="Greet me"
          icon={<TourIcon fontSize="medium" />}
          note="Greetings will be offered next time site reloads."
        />
        <SwitchSetting
          settingKey="openExistingConversation"
          settingKeyDisplayName="Open Existing Conversation"
          icon={<OpenInBrowserIcon fontSize="medium" />}
          note="When creating new conversations, if conversation already exists, open it. This only applies to one on one conversations."
        />
      </List>
    </Box>
  )
}

export default Setting
