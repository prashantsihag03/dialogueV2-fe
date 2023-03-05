import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import placeholderProfilePicture from '../../assets/steverRogers.jpg'
import { IChatQuickView } from './types'
import {
  chatIndicatorStyles,
  chatUnSeenMsgContainerStyles,
  containerStyles,
  contentContainerStyles,
  contentMainTextStyles,
  profileContainerStyle,
} from './styles'

export const ChatQuickView: React.FC<IChatQuickView> = ({
  name,
  unseen,
  lastMessage,
  lastMessageTime,
}: IChatQuickView) => {
  return (
    <Box sx={containerStyles}>
      <Box sx={profileContainerStyle}>
        <img
          style={{ width: '100%' }}
          src={placeholderProfilePicture}
          alt={`${name}'s profile`}
        />
      </Box>

      <Box sx={contentContainerStyles}>
        <Box sx={contentMainTextStyles}>
          <Typography variant="body1">{name}</Typography>
          <Typography variant="subtitle2">{lastMessage}</Typography>
        </Box>

        <Box sx={chatIndicatorStyles}>
          <Typography variant="subtitle2">{lastMessageTime}</Typography>
          {unseen > 0 ? (
            <Box sx={chatUnSeenMsgContainerStyles}>
              <Typography variant="subtitle2" sx={{ color: 'white' }}>
                {unseen}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Box>
  )
}
