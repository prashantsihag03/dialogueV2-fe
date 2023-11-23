import { Skeleton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import placeholderProfilePicture from '../../assets/steverRogers.jpg'
import { IChatQuickView } from './types'
import {
  chatIndicatorStyles,
  chatUnSeenMsgContainerStyles,
  containerStyles,
  contentContainerStyles,
  contentMainTextStyles,
} from './styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setActiveConversation } from '../../store/chats/slice'
import { useGetProfileQuery } from '../../store/api/slice'
import cleanTimeUTCInstant from '../../utils/date-time-utils'
import { getMyProfileData } from '../../store/profile/selector'
import { useEffect } from 'react'
import { getActiveConversation } from '../../store/chats/selector'

export const ChatQuickView: React.FC<IChatQuickView> = ({
  conversationId,
  conversationName,
  unseen,
  isGroup,
  lastMessage,
  lastMessageTime,
  lastMessageSenderId,
}: IChatQuickView) => {
  const AppDispatch = useAppDispatch()
  const myProfile = useAppSelector(getMyProfileData)
  const activeConversation = useAppSelector(getActiveConversation)
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
        isGroup: isGroup,
        profileId: isGroup ? conversationId : conversationName,
      })
    )
    AppDispatch({ type: 'socket/hello', payload: 'Hello from frontend' })
  }

  const getLastMsgDisplayValue = () => {
    if (lastMessage != null && lastMessage.length > 0) {
      if (myProfile.id === lastMessageSenderId) {
        return `You: ${lastMessage}`
      }
      return `${lastMessageSenderId}: ${lastMessage}`
    }
    return ''
  }

  useEffect(() => {
    console.log('MyProfile: ', myProfile)
  }, [myProfile])

  return (
    <Box
      sx={{
        ...containerStyles,
        backgroundColor:
          activeConversation?.conversationId === conversationId
            ? 'action.hover'
            : undefined,
      }}
      onClick={onClickHandler}
      borderRadius={1}
    >
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        width="100%"
        padding="2%"
        sx={{ transition: 'all 0.35s linear' }}
      >
        <Stack
          direction="row"
          width="10%"
          borderRadius={100}
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
        >
          <img
            style={{ width: '100%' }}
            src={placeholderProfilePicture}
            alt={`${conversationName}'s profile`}
          />
        </Stack>

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
              {getLastMsgDisplayValue()}
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
      </Stack>
    </Box>
  )
}
