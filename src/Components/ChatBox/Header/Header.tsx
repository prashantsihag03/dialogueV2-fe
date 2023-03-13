import { Box, SxProps, Typography } from '@mui/material'
import { Theme } from '@mui/system'
import placeholderProfilePicture from '../../../assets/steverRogers.jpg'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'

const containerStyle: SxProps<Theme> = {
  width: '100%',
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const profileContainer: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
}

const pictureContainer: SxProps<Theme> = {
  width: '3rem',
  borderRadius: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}

const userDetailContainer: SxProps<Theme> = {
  width: '100%',
  marginLeft: '2%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}

const optionContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

const iconStyles: SxProps<Theme> = {
  marginLeft: '1.2rem',
}

export interface IActiveChatHeader {
  name: string
  online: boolean
}

export const Header: React.FC<IActiveChatHeader> = ({
  name,
  online,
}: IActiveChatHeader) => {
  return (
    <Box sx={containerStyle}>
      <Box sx={profileContainer}>
        <Box sx={pictureContainer}>
          <img
            style={{ width: '100%' }}
            src={placeholderProfilePicture}
            alt={`${name}'s profile`}
          />
        </Box>
        <Box sx={userDetailContainer}>
          <Typography variant="h3">{name}</Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: online ? 'green' : 'gray' }}
          >
            {online ? 'Online' : 'Offline'}
          </Typography>
        </Box>
      </Box>
      <Box sx={optionContainer}>
        <PermMediaOutlinedIcon sx={iconStyles} />
        <CallOutlinedIcon sx={iconStyles} />
        <VideoCallOutlinedIcon sx={iconStyles} />
      </Box>
    </Box>
  )
}
