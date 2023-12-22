import { Box, Stack, Typography } from '@mui/material'
import { secondary } from '../../Theme/colors'
import { container, message, profileContainer, subContainer } from './styles'
import { useGetProfileQuery } from '../../store/api/slice'

export interface IMessage {
  name: string
  timeStamp: string
  text: string
  source: 'incoming' | 'outgoing'
  status: 'sent' | 'pending' | 'failed'
  id?: string
  file?: string
}

export interface MessageProps extends IMessage {
  showProfilePic: boolean
}

const getBackgroundColor = (
  status: 'sent' | 'pending' | 'failed',
  source: 'outgoing' | 'incoming'
) => {
  if (status === 'pending') {
    return 'action.hover'
  }
  if (status === 'failed') {
    return 'maroon'
  }
  return source === 'outgoing' ? secondary.light : 'background.default'
}

export const Message: React.FC<MessageProps> = ({
  name,
  timeStamp,
  text,
  source,
  status,
  id,
  file,
  showProfilePic,
}: MessageProps) => {
  const { data: profileData } = useGetProfileQuery(name)

  return (
    <Box
      className={id ? `${id}-message-container` : undefined}
      sx={{
        ...container,
        flexDirection: source === 'incoming' ? 'row' : 'row-reverse',
      }}
    >
      {showProfilePic ? (
        <Box sx={{ ...subContainer, maxWidth: '50px', minWidth: '30px' }}>
          <Box
            sx={{
              ...profileContainer,
              width: '2rem',
              height: '2rem',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
          >
            <img
              style={{ width: '100%' }}
              src={`data:image;base64,${profileData?.profileImg}`}
              alt={`${name}'s profile`}
            />
          </Box>
          <Typography variant="subtitle1">{timeStamp}</Typography>
        </Box>
      ) : null}
      <Box
        sx={{
          ...subContainer,
          flex: '5',
          alignItems: source === 'incoming' ? 'flex-start' : 'flex-end',
        }}
      >
        <Typography variant="subtitle1">
          {source === 'outgoing' ? 'you' : name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...message,
            color: source === 'outgoing' ? 'white' : 'palette.text.primary',
            backgroundColor: getBackgroundColor(status, source),
          }}
        >
          {file ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              maxWidth="15rem"
              maxHeight="15rem"
            >
              <img
                src={`data:image;base64,${file}`}
                alt="img"
                width="100%"
                height="100%"
              />
            </Stack>
          ) : null}
          {text}
        </Typography>
      </Box>
      <Box sx={{ width: '3rem' }}></Box>
    </Box>
  )
}
