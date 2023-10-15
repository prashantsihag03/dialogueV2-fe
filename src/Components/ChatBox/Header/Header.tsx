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
import { setActiveProfileUserId } from '../../../store/profile/slice'

export interface IActiveChatHeader {
  userId: string
  fullName: string
  online: boolean
}

export const Header: React.FC<IActiveChatHeader> = ({
  userId,
  fullName,
  online,
}: IActiveChatHeader) => {
  const appDispatch = useAppDispatch()

  return (
    <Box sx={containerStyle}>
      <Box sx={profileContainer} borderRadius={1}>
        <Box sx={pictureContainer}>
          <img
            style={{ width: '100%' }}
            src={placeholderProfilePicture}
            alt={`${fullName}'s profile`}
          />
        </Box>
        <Box
          sx={userDetailContainer}
          borderRadius={1}
          onClick={() => {
            appDispatch(setActiveProfileUserId({ userId, fullName: fullName }))
            appDispatch(setActiveSideBar('profile'))
          }}
        >
          <Typography variant="h3" sx={{ color: 'inherit' }}>
            {fullName}
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight={'bold'}
            sx={{
              color: online ? 'success.main' : 'gray',
            }}
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
