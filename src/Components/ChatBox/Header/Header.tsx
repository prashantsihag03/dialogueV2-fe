import { Box, Typography } from '@mui/material'
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
import { useGetProfileQuery } from '../../../store/api/slice'

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
  const { data: otherUserData } = useGetProfileQuery(userId)

  const getConversationPicture = (): string | undefined => {
    if (otherUserData?.profileImg != null)
      return `data:image;base64,${otherUserData?.profileImg}`
    return undefined
  }

  return (
    <Box sx={containerStyle}>
      <Box sx={profileContainer} borderRadius={1}>
        <Box
          className="conversation-box-profile-heading"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Box sx={pictureContainer}>
            <img
              style={{ width: '100%' }}
              src={getConversationPicture()}
              alt={`${fullName}'s profile`}
            />
          </Box>
          <Box
            sx={userDetailContainer}
            className="conversation-box-conversation-profile-box"
            borderRadius={1}
            onClick={() => {
              appDispatch(
                setActiveProfileUserId({
                  id: userId,
                  name: fullName,
                  isLoggedInUser: false,
                })
              )
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
      </Box>
      <Box sx={optionContainer} className="conversation-box-header-options">
        <PermMediaOutlinedIcon
          sx={iconStyles}
          fontSize="small"
          titleAccess="Media files"
          className="conversation-box-conversation-media-icon"
        />
        <CallOutlinedIcon
          sx={iconStyles}
          titleAccess="audio call"
          className="conversation-box-conversation-audio-call-icon"
        />
        <VideoCallOutlinedIcon
          sx={iconStyles}
          titleAccess="video call"
          className="conversation-box-conversation-video-call-icon"
        />
      </Box>
    </Box>
  )
}
