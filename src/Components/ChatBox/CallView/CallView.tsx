import { Stack } from '@mui/material'
import { useAppSelector } from '../../../store/hooks'
import { inCall } from '../../../store/rtc/selector'

const CallView: React.FC = () => {
  const call = useAppSelector(inCall)

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height={'100%'}
      position="absolute"
      bottom="0%"
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
          muted
          style={{
            width: '100%',
            borderRadius: '1rem',
            zIndex: call !== 'idle' ? 100 : -100,
          }}
        ></video>
        <button
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            zIndex: call !== 'idle' ? 102 : -100,
          }}
          onClick={() => {
            const remoteVideo = document.getElementById(
              'remoteVideo'
            ) as HTMLVideoElement | null
            if (remoteVideo != null) {
              const currentMute = remoteVideo.muted
              remoteVideo.muted = !currentMute
            }
          }}
        >
          mute/Unmute
        </button>
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
          backgroundColor: 'background.paper',
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
