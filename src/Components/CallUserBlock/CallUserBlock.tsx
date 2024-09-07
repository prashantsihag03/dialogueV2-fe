/* eslint-disable jsx-a11y/media-has-caption */
import { Stack, Typography } from '@mui/material'
import MicOffIcon from '@mui/icons-material/MicOff'
import MicIcon from '@mui/icons-material/Mic'
import { useAppSelector } from '../../store/hooks'
import {
  getCallParticipantMutedAudio,
  getCallParticipantMutedVideo,
} from '../../store/rtc/selector'
import { useGetProfileQuery } from '../../store/api/slice'

interface CallUserBlockProps {
  text: string
  borderColor: string
  userTagColor: string
  userId: string
  width?: string
  height?: string
  type: 'loggedInUser' | 'other'
}

const CallUserBlock: React.FC<CallUserBlockProps> = ({
  text,
  borderColor,
  userTagColor,
  userId,
  width,
  height,
  type,
}: CallUserBlockProps) => {
  const audioMuted = useAppSelector(getCallParticipantMutedAudio(userId))
  const videoMuted = useAppSelector(getCallParticipantMutedVideo(userId))
  const { data: userProfileData } = useGetProfileQuery(userId)

  const getConversationPicture = (): string | undefined => {
    if (userProfileData?.profileImg != null)
      return `data:image;base64,${userProfileData?.profileImg}`
    return undefined
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      maxWidth={width}
      width={videoMuted ? width : undefined}
      height={height}
      zIndex={100}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <>
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
        <Stack
          width={'100%'}
          height={'100%'}
          justifyContent={'center'}
          alignItems={'center'}
          position={'relative'}
        >
          <Stack
            justifyContent={'space-between'}
            alignItems={'flex-start'}
            position={'absolute'}
            direction={'row'}
            width={'100%'}
            top={'0rem'}
            left={'0rem'}
            zIndex={102}
            padding={'1px'}
          >
            <Typography
              variant="subtitle1"
              component={'span'}
              padding={'0 0.35rem'}
              sx={{
                color: 'primary.dark',
                backgroundColor: userTagColor,
                fontSize: '0.8rem',
                borderRadius: '7px',
                borderBottomLeftRadius: '0px',
                borderTopRightRadius: '0px',
              }}
            >
              {userId}
            </Typography>
            {audioMuted ? (
              <MicOffIcon
                sx={{
                  backgroundColor: 'grey',
                  borderRadius: '7px',
                  borderBottomRightRadius: '0px',
                  borderTopLeftRadius: '0px',
                  '&:hover': { backgroundColor: 'grey' },
                }}
              />
            ) : (
              <MicIcon
                sx={{
                  backgroundColor: 'grey',
                  '&:hover': { backgroundColor: 'grey' },
                  borderRadius: '7px',
                  borderBottomRightRadius: '0px',
                  borderTopLeftRadius: '0px',
                }}
              />
            )}
          </Stack>

          {videoMuted ? (
            <Stack
              height={'100%'}
              width={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
              padding={'1rem'}
              borderRadius={1}
              sx={{
                objectFit: 'contain',
                backgroundColor: '#343434',
              }}
              zIndex={101}
            >
              <Stack
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
                borderRadius={100}
                width={'8rem'}
                height={'8rem'}
              >
                <img
                  style={{ width: '100%', objectFit: 'contain' }}
                  src={getConversationPicture()}
                  alt={`${userProfileData?.fullname}'s profile`}
                />
              </Stack>
            </Stack>
          ) : null}

          <video
            id={
              type === 'loggedInUser' ? 'loggedInUser-video' : `${userId}-video`
            }
            className={'callVideo'}
            autoPlay
            muted={audioMuted}
            style={{
              objectFit: 'contain',
              width: videoMuted ? '0%' : '100%',
              height: videoMuted ? '0%' : '100%',
              border: `2px solid ${borderColor}`,
              borderRadius: '7px',
              zIndex: 101,
            }}
          ></video>
        </Stack>
      </>
    </Stack>
  )
}

export default CallUserBlock
