import { Box, List, Typography } from '@mui/material'
import { containerStyles, headingStyles } from './styles'
import SwitchSetting from './SwitchSetting'

const Setting: React.FC = () => {
  return (
    <Box sx={containerStyles} className="setting-sidebar">
      <Box sx={headingStyles}>
        <Typography variant="h2">Settings</Typography>
      </Box>
      <List sx={{ width: '100%', padding: '3% 0%' }} dense>
        <SwitchSetting
          settingKey="enterSendsMessage"
          settingKeyDisplayName="Enter sends message"
        />
        <SwitchSetting
          settingKey="greetMeEverytime"
          settingKeyDisplayName="Greet Me"
        />
      </List>
    </Box>
  )
}

export default Setting
