/* eslint-disable jsx-a11y/media-has-caption */
import { Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { inCall, inCallId } from '../../../store/rtc/selector'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import { useState } from 'react'
import { WebRTCActions } from '../../../store/middlewares/webrtc'
import CallUserBlock from '../../CallUserBlock/CallUserBlock'
import { getSideBarPreference } from '../../../store/sidebar/selector'

const CallView: React.FC = () => {
  const browser = useAppSelector(getSideBarPreference)

  const call = useAppSelector(inCall)
  const callId = useAppSelector(inCallId)
  const dispatch = useAppDispatch()
  const [micOn, setMicOn] = useState<boolean>(true)

  return (
    <Stack
      direction={browser === 'mobile' ? 'row' : 'column'}
      justifyContent="center"
      alignItems="center"
      width={'100%'}
      height={'100%'}
      position="fixed"
      bottom="0%"
      left="0%"
      zIndex={call !== 'idle' ? 100 : -100}
      sx={{
        backgroundColor: 'background.default',
      }}
    >
      {call === 'calling' ? (
        <Typography
          variant="body1"
          position="absolute"
          zIndex={105}
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          ringing
        </Typography>
      ) : null}

      {call !== 'idle' && call !== 'calling' && callId != null ? (
        <CallUserBlock
          text={call}
          borderColor="transparent"
          userTagColor="green"
          userId={callId}
          defaultMute={false}
          width={browser === 'mobile' ? '100%' : `100%`}
          height={browser === 'mobile' ? undefined : '100%'}
        />
      ) : null}

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        position={call != 'calling' ? 'absolute' : undefined}
        height={call === 'calling' ? '100%' : '30%'}
        width={call === 'calling' ? '100%' : '30%'}
        bottom={call != 'calling' ? '1rem' : undefined}
        right={call != 'calling' ? '1rem' : undefined}
        zIndex={call !== 'idle' ? 101 : -100}
        sx={{
          backgroundColor: 'transparent',
          transition: 'all 0.5 ease-in-out',
        }}
      >
        <CallUserBlock
          text={''}
          borderColor="transparent"
          userTagColor="steelblue"
          userId={'you'}
          defaultMute={true}
          width={'100%'}
          height={call === 'calling' ? '100%' : undefined}
        />
      </Stack>

      <Stack
        direction={'row'}
        alignItems={'center'}
        position={'absolute'}
        bottom={'2rem'}
        left={'50%'}
        padding={'0.5rem'}
        sx={{ backgroundColor: 'text.primary', transform: 'translateX(-50%)' }}
        borderRadius={1}
        zIndex={call !== 'idle' ? 102 : -100}
      >
        {micOn ? (
          <VolumeOffIcon
            fontSize="large"
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              const remoteVideo = document.getElementById(
                `${callId}-video`
              ) as HTMLVideoElement | null
              if (remoteVideo != null) {
                const currentMute = remoteVideo.muted
                remoteVideo.muted = !currentMute
                setMicOn(remoteVideo.muted)
              }
            }}
          />
        ) : (
          <VolumeUpIcon
            fontSize="large"
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              const remoteVideo = document.getElementById(
                `${callId}-video`
              ) as HTMLVideoElement | null
              if (remoteVideo != null) {
                const currentMute = remoteVideo.muted
                remoteVideo.muted = !currentMute
                setMicOn(remoteVideo.muted)
              }
            }}
          />
        )}
        <CallEndIcon
          fontSize="large"
          sx={{
            color: 'primary.dark',
            backgroundColor: 'error.main',
            margin: '0.5rem',
            '&:hover': {
              color: 'primary.dark',
              backgroundColor: 'error.main',
              cursor: 'pointer',
            },
          }}
          onClick={() => {
            dispatch({
              type: WebRTCActions.endCall,
              payload: { callId: callId },
            })
          }}
        />
      </Stack>
    </Stack>
  )
}

export default CallView
