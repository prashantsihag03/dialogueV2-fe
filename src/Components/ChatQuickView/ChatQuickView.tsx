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
  subContainerStyles,
} from './styles'

export const ChatQuickView: React.FC<IChatQuickView> = ({
  name,
  unseen,
  lastMessage,
  lastMessageTime,
}: IChatQuickView) => {
  return (
    <Box sx={containerStyles}>
      <Box sx={subContainerStyles}>
        <Box sx={profileContainerStyle}>
          <img
            style={{ width: '100%' }}
            src={placeholderProfilePicture}
            alt={`${name}'s profile`}
          />
        </Box>

        <Box sx={contentContainerStyles}>
          <Box sx={contentMainTextStyles}>
            <Typography variant="body2" sx={{ width: '100%' }}>
              {name}
            </Typography>
            <Typography
              component="div"
              variant="subtitle2"
              sx={{
                width: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {lastMessage}
            </Typography>
          </Box>

          <Box sx={chatIndicatorStyles}>
            <Typography variant="subtitle2">{lastMessageTime}</Typography>
            {unseen > 0 ? (
              <Box sx={chatUnSeenMsgContainerStyles}>
                <Typography variant="subtitle2" sx={{ color: 'white' }}>
                  {unseen > 99 ? '99+' : unseen}
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
