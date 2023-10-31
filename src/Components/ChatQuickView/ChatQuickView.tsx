import { Skeleton, Typography } from '@mui/material'
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
import { useAppDispatch } from '../../store/hooks'
import { setActiveConversation } from '../../store/chats/slice'
import { useGetProfileQuery } from '../../store/api/slice'
import cleanTimeUTCInstant from '../../utils/date-time-utils'

export const ChatQuickView: React.FC<IChatQuickView> = ({
  conversationId,
  conversationName,
  unseen,
  isGroup,
  lastMessage,
  lastMessageTime,
}: IChatQuickView) => {
  const AppDispatch = useAppDispatch()
  const { isFetching: isFetchingOtherUser, data: otherUserData } =
    useGetProfileQuery(conversationName, {
      skip: Boolean(isGroup),
    })

  const isConversationNameLoading = (): boolean => {
    if (isGroup) return false
    return isFetchingOtherUser
  }

  const getConversationName = (): string => {
    if (isGroup) return conversationName
    if (isFetchingOtherUser || otherUserData === undefined) return ''
    return otherUserData.fullname
  }

  const onClickHandler = () => {
    AppDispatch(
      setActiveConversation({
        conversationId,
        conversationName: getConversationName(),
      })
    )
  }

  return (
    <Box sx={containerStyles} onClick={onClickHandler} borderRadius={1}>
      <Box sx={subContainerStyles}>
        <Box sx={profileContainerStyle}>
          <img
            style={{ width: '100%' }}
            src={placeholderProfilePicture}
            alt={`${conversationName}'s profile`}
          />
        </Box>

        <Box sx={contentContainerStyles}>
          <Box sx={contentMainTextStyles}>
            {isConversationNameLoading() ? (
              <Skeleton variant="rectangular" width="100%" />
            ) : (
              <Typography variant="body2" sx={{ width: '100%' }}>
                {getConversationName()}
              </Typography>
            )}
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
            <Typography variant="subtitle2">
              {cleanTimeUTCInstant(lastMessageTime)}
            </Typography>
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
