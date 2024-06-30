/* eslint-disable jsx-a11y/media-has-caption */
import { Stack, Typography } from '@mui/material'

const CallUserBlock: React.FC<{
  text: string
  borderColor: string
  userTagColor: string
  userId: string
  defaultMute: boolean
  width?: string
  height?: string
}> = ({
  text,
  borderColor,
  userTagColor,
  userId,
  defaultMute,
  width,
  height,
}: {
  text: string
  borderColor: string
  userTagColor: string
  userId: string
  defaultMute: boolean
  width?: string
  height?: string
}) => {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      width={width}
      height={height}
      zIndex={100}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <>
        <Typography
          variant="subtitle1"
          position={'absolute'}
          component={'span'}
          top={'0.5rem'}
          left={'0.5rem'}
          zIndex={102}
          padding={'0 0.35rem'}
          borderRadius={1}
          sx={{ color: 'primary.dark', backgroundColor: userTagColor }}
        >
          {userId}
        </Typography>
        <Stack
          position="absolute"
          height={'100%'}
          width={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          top={'0%'}
          left={'0%'}
          zIndex={100}
        >
          <Typography variant="body1">{text}</Typography>
        </Stack>
        <video
          id={`${userId}-video`}
          className={'callVideo'}
          autoPlay
          muted={defaultMute}
          style={{
            width: '100%',
            height: '100%',
            border: `2px solid ${borderColor}`,
            borderRadius: '1rem',
            zIndex: 101,
          }}
        ></video>
      </>
    </Stack>
  )
}

export default CallUserBlock
