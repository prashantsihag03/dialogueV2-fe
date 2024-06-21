/* eslint-disable jsx-a11y/media-has-caption */
import { Stack } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { inCall, inCallId } from '../../../store/rtc/selector'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import { useState } from 'react'

const CallView: React.FC = () => {
  const call = useAppSelector(inCall)
  const callId = useAppSelector(inCallId)
  const dispatch = useAppDispatch()
  const [micOn, setMicOn] = useState<boolean>(true)

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={'100%'}
      position="fixed"
      bottom="0%"
      left="0%"
      zIndex={call !== 'idle' ? 100 : -100}
      sx={{
        backgroundColor: 'background.default',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        position="relative"
        height="100%"
        width="100%"
        zIndex={call !== 'idle' ? 100 : -100}
        sx={{
          backgroundColor: 'background.default',
        }}
      >
        <video
          id="remoteVideo"
          autoPlay
          muted={micOn}
          style={{
            width: '95%',
            borderRadius: '1rem',
            zIndex: call !== 'idle' ? 100 : -100,
          }}
        ></video>
        <Stack
          direction={'row'}
          alignItems={'center'}
          position={'absolute'}
          bottom={'2rem'}
          left={'2rem'}
          padding={'0.5rem'}
          sx={{ backgroundColor: 'text.primary' }}
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
                  'remoteVideo'
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
                  'remoteVideo'
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
              dispatch({ type: 'rtc/endCall', payload: { callId: callId } })
              const localVideo = document.getElementById(
                'localVideo'
              ) as HTMLVideoElement | null
              if (localVideo == null) return
              if ('srcObject' in localVideo) {
                localVideo.srcObject = null
              }
              const remoteVideo = document.getElementById(
                'remoteVideo'
              ) as HTMLVideoElement | null
              if (remoteVideo == null) return
              if ('srcObject' in remoteVideo) {
                remoteVideo.srcObject = null
              }
            }}
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        height="30%"
        width="30%"
        bottom="1rem"
        right="1rem"
        zIndex={call !== 'idle' ? 101 : -100}
        sx={{
          backgroundColor: 'transparent',
          transition: 'all 0.5 ease-in-out',
        }}
      >
        <video
          id="localVideo"
          autoPlay
          muted
          style={{
            width: '100%',
            borderRadius: '1rem',
            zIndex: call !== 'idle' ? 101 : -100,
          }}
        ></video>
      </Stack>
    </Stack>
  )
}

export default CallView
