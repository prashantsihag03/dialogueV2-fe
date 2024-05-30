import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined'
import {
  iconStyles,
  containerStyle,
  optionContainer,
  profileContainer,
  userDetailContainer,
} from './styles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setActiveSideBar } from '../../../store/sidebar/slice'
import { setActiveProfileUserId } from '../../../store/profile/slice'
import { useGetProfileQuery } from '../../../store/api/slice'
import { getSideBarPreference } from '../../../store/sidebar/selector'
import VerticalDotMenu from '../../VerticalDotMenu/VerticalDotMenu'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { setActiveConversation } from '../../../store/chats/slice'

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
  const browser = useAppSelector(getSideBarPreference)
  const { data: otherUserData } = useGetProfileQuery(userId)

  const getConversationPicture = (): string | undefined => {
    if (otherUserData?.profileImg != null)
      return `data:image;base64,${otherUserData?.profileImg}`
    return undefined
  }

  const callOptionClickHandler = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {
        const video = document.getElementById(
          'localVideo'
        ) as HTMLVideoElement | null

        if (video == null) return
        if ('srcObject' in video) {
          video.srcObject = mediaStream
        }
        video.play()
        appDispatch({
          type: 'rtc/createOffer',
          payload: {
            stream: mediaStream,
            userIdToConnect: otherUserData?.id,
          },
        })
      })
      .catch()
  }

  return (
    <Stack
      direction="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={containerStyle}>
        <Box sx={profileContainer} borderRadius={1}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className="conversation-box-profile-heading"
          >
            {browser === 'mobile' ? (
              <ArrowBackIosIcon
                sx={{ marginRight: '0.5rem' }}
                onClick={
                  browser === 'mobile'
                    ? () => {
                        appDispatch(setActiveConversation(undefined))
                        appDispatch(setActiveSideBar('chats'))
                      }
                    : undefined
                }
              />
            ) : null}

            <Stack
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              borderRadius={100}
              width={browser === 'mobile' ? '2.5rem' : '3rem'}
              height={browser === 'mobile' ? '2.5rem' : '3rem'}
            >
              <img
                style={{ width: '100%' }}
                src={getConversationPicture()}
                alt={`${fullName}'s profile`}
              />
            </Stack>
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
              <Typography
                variant="h3"
                sx={{
                  color: 'inherit',
                  fontWeight: browser === 'mobile' ? 'normal' : 'bold',
                }}
              >
                {fullName}
              </Typography>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  color: online ? 'success.main' : 'gray',
                }}
              >
                {online ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={optionContainer} className="conversation-box-header-options">
          {browser === 'mobile' ? (
            <>
              <VerticalDotMenu>
                <MenuItem>Shared Media</MenuItem>
                <MenuItem
                  onClick={() => {
                    callOptionClickHandler()
                  }}
                >
                  Audio Call
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    callOptionClickHandler()
                  }}
                >
                  Video Call
                </MenuItem>
              </VerticalDotMenu>
            </>
          ) : (
            <>
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
                onClick={callOptionClickHandler}
              />
              <VideoCallOutlinedIcon
                sx={iconStyles}
                titleAccess="video call"
                className="conversation-box-conversation-video-call-icon"
                onClick={callOptionClickHandler}
              />
            </>
          )}
        </Box>
      </Box>
      <Divider sx={{ width: '100%', color: 'primary.main' }} />
    </Stack>
  )
}
