import { Box, Typography } from '@mui/material'
import placeholderProfilePicture from '../../../assets/steverRogers.jpg'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import {
  iconStyles,
  containerStyle,
  optionContainer,
  pictureContainer,
  profileContainer,
  userDetailContainer,
} from './styles'
import { useAppDispatch } from '../../../store/hooks'
import { setActiveSideBar } from '../../../store/sidebar/slice'

export interface IActiveChatHeader {
  name: string
  online: boolean
}

export const Header: React.FC<IActiveChatHeader> = ({
  name,
  online,
}: IActiveChatHeader) => {
  const appDispatch = useAppDispatch()

  return (
    <Box sx={containerStyle}>
      <Box sx={profileContainer}>
        <Box
          sx={pictureContainer}
          onClick={() => appDispatch(setActiveSideBar('profile'))}
        >
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
        <PermMediaOutlinedIcon
          sx={iconStyles}
          fontSize="small"
          titleAccess="Media files"
        />
        <CallOutlinedIcon sx={iconStyles} titleAccess="audio call" />
        <VideoCallOutlinedIcon sx={iconStyles} titleAccess="video call" />
      </Box>
    </Box>
  )
}
