/* eslint-disable jsx-a11y/media-has-caption */
import { Stack, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  inCall,
  inCallId,
  multipleCameraMode,
  muteAudio,
  muteVideo,
  suppressNoise,
} from '../../../store/rtc/selector'
import MicOffIcon from '@mui/icons-material/MicOff'
import MicIcon from '@mui/icons-material/Mic'
import VideocamIcon from '@mui/icons-material/Videocam'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos'
import NoiseAwareIcon from '@mui/icons-material/NoiseAware'
import NoiseControlOffIcon from '@mui/icons-material/NoiseControlOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import { WebRTCActions } from '../../../store/middlewares/webrtc'
import CallUserBlock from '../../CallUserBlock/CallUserBlock'
import { getSideBarPreference } from '../../../store/sidebar/selector'

const CallView: React.FC = () => {
  const browser = useAppSelector(getSideBarPreference)
  const call = useAppSelector(inCall)
  const callId = useAppSelector(inCallId)
  const dispatch = useAppDispatch()
  const micOn = useAppSelector(muteAudio)
  const cameraOn = useAppSelector(muteVideo)
  const hasMultipleCameraMode = useAppSelector(multipleCameraMode)
  const isNoiseSuppressed = useAppSelector(suppressNoise)

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
        {isNoiseSuppressed ? (
          <NoiseControlOffIcon
            fontSize="large"
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            titleAccess={'Noise suppression is enabled. Click to disable it.'}
            onClick={() => {
              dispatch({
                type: WebRTCActions.suppressNoise,
                payload: { callId: callId, suppress: false },
              })
            }}
          />
        ) : (
          <NoiseAwareIcon
            fontSize="large"
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            titleAccess={'Noise suppression is disable. Click to enable it.'}
            onClick={() => {
              dispatch({
                type: WebRTCActions.suppressNoise,
                payload: { callId: callId, suppress: true },
              })
            }}
          />
        )}

        {!micOn ? (
          <MicIcon
            fontSize="large"
            titleAccess={'Microphone is on. Click to turn it off.'}
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              dispatch({
                type: WebRTCActions.muteAudio,
                payload: { callId: callId, mute: true },
              })
            }}
          />
        ) : (
          <MicOffIcon
            fontSize="large"
            titleAccess={'Microphone is off. Click to turn it on.'}
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              dispatch({
                type: WebRTCActions.muteAudio,
                payload: { callId: callId, mute: false },
              })
            }}
          />
        )}

        {hasMultipleCameraMode ? (
          <FlipCameraIosIcon
            fontSize="large"
            titleAccess={
              'Click to toggle camera mode between rear and front facing.'
            }
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              dispatch({
                type: WebRTCActions.changeCamera,
                payload: { callId: callId },
              })
            }}
          />
        ) : null}

        {!cameraOn ? (
          <VideocamIcon
            fontSize="large"
            titleAccess={'Camera is off. Click to turn it on.'}
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              dispatch({
                type: WebRTCActions.muteVideo,
                payload: { callId: callId, mute: true },
              })
            }}
          />
        ) : (
          <VideocamOffIcon
            fontSize="large"
            titleAccess={'Camera is on. Click to turn it off.'}
            sx={{
              color: 'background.default',
              margin: '0.5rem',
            }}
            onClick={() => {
              dispatch({
                type: WebRTCActions.muteVideo,
                payload: { callId: callId, mute: false },
              })
            }}
          />
        )}

        <CallEndIcon
          fontSize="large"
          titleAccess={'Click to end the call.'}
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
