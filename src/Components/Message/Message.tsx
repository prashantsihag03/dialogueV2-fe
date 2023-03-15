import { Box, Typography } from '@mui/material'
import placeholderProfilePicture from '../../assets/steverRogers.jpg'
import { container, message, profileContainer, subContainer } from './styles'

export interface IMessage {
  name: string
  timeStamp: string
  text: string
}

export const Message: React.FC<IMessage> = ({
  name,
  timeStamp,
  text,
}: IMessage) => {
  return (
    <Box sx={container}>
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
      <Box sx={{ ...subContainer, flex: '5', alignItems: 'flex-start' }}>
        <Typography variant="subtitle1">{name}</Typography>
        <Typography variant="body2" sx={message}>
          {text}
        </Typography>
      </Box>
    </Box>
  )
}
