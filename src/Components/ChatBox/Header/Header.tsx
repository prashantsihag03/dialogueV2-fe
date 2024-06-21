import { Box, Divider, Stack, Typography } from '@mui/material'
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
import {
  useGetProfileQuery,
  useGetUserLastSeenQuery,
} from '../../../store/api/slice'
import { getSideBarPreference } from '../../../store/sidebar/selector'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { setActiveConversation } from '../../../store/chats/slice'
import { useCallback, useEffect } from 'react'
import { setCall } from '../../../store/rtc/slice'

export interface IActiveChatHeader {
  userId: string
  fullName: string
}

export const Header: React.FC<IActiveChatHeader> = ({
  userId,
  fullName,
}: IActiveChatHeader) => {
  const appDispatch = useAppDispatch()
  const browser = useAppSelector(getSideBarPreference)
  const { data: otherUserData } = useGetProfileQuery(userId)
  const { data: otherUserLastSeenData, refetch } =
    useGetUserLastSeenQuery(userId)

  const getConversationPicture = (): string | undefined => {
    if (otherUserData?.profileImg != null)
      return `data:image;base64,${otherUserData?.profileImg}`
    return undefined
  }

  const callOptionClickHandler = () => {
    if (otherUserData?.id == null) return

    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: 'user',
          echoCancellation: true,
          noiseSuppression: true,
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
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
        // show call view
        appDispatch(
          setCall({
            call: 'initiating',
            userId: otherUserData?.id,
          })
        )
        // create peer instance to hold connection in
        appDispatch({
          type: 'rtc/receiverPeer',
          payload: { userIdToConnect: otherUserData?.id, stream: mediaStream },
        })

        // send call event
        appDispatch({
          type: 'socket/call',
          payload: {
            userToCall: otherUserData?.id,
          },
        })
      })
      .catch()
  }

  const isOtherUserOnline = useCallback(() => {
    if (otherUserLastSeenData?.ISO == null) return false
    const UTCDate = new Date(otherUserLastSeenData?.ISO)
    const currentDate = new Date()

    const diffInMilliSec = Math.abs(UTCDate.getTime() - currentDate.getTime())

    if (diffInMilliSec / (1000 * 60) < 2) return true
    return false
  }, [otherUserLastSeenData?.ISO])

  const goBackInMobile = useCallback(() => {
    appDispatch(setActiveConversation(undefined))
    appDispatch(setActiveSideBar('chats'))
  }, [appDispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      refetch()
    }, 120 * 1000) // 120 seconds = 2 minutes

    return () => clearInterval(interval)
  }, [refetch])

  useEffect(() => {
    if (browser === 'web') return
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault()
      goBackInMobile()
      // Push a new state to prevent the user from leaving the app
      window.history.pushState(null, '', window.location.pathname)
    }

    window.history.pushState(null, '', window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => {
      if (browser === 'mobile')
        window.removeEventListener('popstate', handlePopState)
    }
  }, [goBackInMobile, browser])

  return (
    <Stack
      direction="column"
      width="100%"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: browser === 'mobile' ? 'sidebar.main' : undefined,
      }}
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
                onClick={browser === 'mobile' ? goBackInMobile : undefined}
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
                  color: isOtherUserOnline() ? 'success.main' : 'gray',
                }}
              >
                {isOtherUserOnline() ? 'Online' : 'Offline'}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box sx={optionContainer} className="conversation-box-header-options">
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
        </Box>
      </Box>
      <Divider sx={{ width: '100%', color: 'primary.main' }} />
    </Stack>
  )
}
