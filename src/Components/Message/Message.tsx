import { Box, Typography } from '@mui/material'
import placeholderProfilePicture from '../../assets/steverRogers.jpg'
import { secondary } from '../../Theme/colors'
import { container, message, profileContainer, subContainer } from './styles'

export interface IMessage {
  name: string
  timeStamp: string
  text: string
  source: 'incoming' | 'outgoing'
  status: 'sent' | 'pending' | 'failed'
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

export const Message: React.FC<IMessage> = ({
  name,
  timeStamp,
  text,
  source,
  status,
}: IMessage) => {
  return (
    <Box
      sx={{
        ...container,
        flexDirection: source === 'incoming' ? 'row' : 'row-reverse',
      }}
    >
      <Box sx={{ ...subContainer, maxWidth: '50px', minWidth: '30px' }}>
        <Box sx={profileContainer}>
          <img
            style={{ width: '100%' }}
            src={placeholderProfilePicture}
            alt={`${name}'s profile`}
          />
        </Box>
        <Typography variant="subtitle1">{timeStamp}</Typography>
      </Box>
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
          {text}
        </Typography>
      </Box>
      <Box sx={{ width: '3rem' }}></Box>
    </Box>
  )
}
