import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { actionIconStyles, actionStyles, headerContainerStyles } from './styles'

export const ProfileHeader: React.FC = () => {
  return (
    <Box sx={headerContainerStyles}>
      <Typography variant="h2">Profile</Typography>
      <Box sx={actionStyles}>
        <EditOutlinedIcon sx={actionIconStyles} />
      </Box>
    </Box>
  )
}
