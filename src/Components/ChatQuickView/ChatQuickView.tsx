import { Divider, Skeleton, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
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
import { getActiveConversation } from '../../store/chats/selector'
import { getSideBarPreference } from '../../store/sidebar/selector'
import { setActiveSideBar } from '../../store/sidebar/slice'

interface ChatQuickViewProps extends IChatQuickView {
  className?: string
  onClick?: () => void
}

export const ChatQuickView: React.FC<ChatQuickViewProps> = ({
  conversationId,
  conversationName,
  unseen,
  isGroup,
  lastMessage,
  lastMessageTime,
  className,
  onClick,
}: ChatQuickViewProps) => {
  const AppDispatch = useAppDispatch()
  const browser = useAppSelector(getSideBarPreference)
  const activeConversation = useAppSelector(getActiveConversation)
  const { isFetching: isFetchingOtherUser, data: otherUserData } =
    useGetProfileQuery(conversationName, {
      skip: Boolean(isGroup),
    })

  const isConversationNameLoading = (): boolean => {
    if (isGroup) return false
    return isFetchingOtherUser
  }

  const getConversationPicture = (): string | undefined => {
    if (!isGroup && otherUserData?.profileImg != null)
      return `data:image;base64,${otherUserData?.profileImg}`
    return undefined
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
    if (browser === 'mobile') {
      AppDispatch(setActiveSideBar('none'))
    }
    if (onClick != null) onClick()
  }

  const getLastMsgDisplayValue = () => {
    if (lastMessage != null && lastMessage.length > 0) {
      return `${lastMessage}`
    }
    return ''
  }

  return (
    <Box
      className={className ?? undefined}
      sx={{
        ...containerStyles,
        '&:hover': {
          cursor: 'pointer',
          fontWeight: 'bold',
          backgroundColor:
            activeConversation?.conversationId === conversationId
              ? 'secondary.light'
              : 'action.hover',
        },
        '&:active': {
          cursor: 'pointer',
          fontWeight: 'bold',
          backgroundColor:
            activeConversation?.conversationId === conversationId
              ? 'secondary.light'
              : 'action.hover',
        },
        backgroundColor:
          activeConversation?.conversationId === conversationId
            ? 'secondary.light'
            : undefined,
      }}
      onClick={() => {
        onClickHandler()
      }}
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
          width="2rem"
          height="2rem"
          borderRadius={100}
          justifyContent="center"
          alignItems="center"
          overflow="hidden"
        >
          <img
            style={{ width: '100%' }}
            src={getConversationPicture()}
            alt={`${conversationName}'s profile`}
          />
        </Stack>

        <Box sx={contentContainerStyles}>
          <Box sx={contentMainTextStyles}>
            {isConversationNameLoading() ? (
              <Skeleton variant="rectangular" width="100%" />
            ) : (
              <Typography
                variant="body2"
                sx={{
                  width: '100%',
                  fontWeight: browser === 'mobile' ? 'normal' : 'bold',
                  color:
                    activeConversation?.conversationId === conversationId
                      ? 'white'
                      : undefined,
                }}
              >
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
                color:
                  activeConversation?.conversationId === conversationId
                    ? 'white'
                    : undefined,
              }}
            >
              {getLastMsgDisplayValue()}
            </Typography>
          </Box>

          <Box sx={chatIndicatorStyles}>
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  activeConversation?.conversationId === conversationId
                    ? 'white'
                    : undefined,
              }}
            >
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
      <Divider sx={{ width: '100%', color: 'primary.main', opacity: '0.5' }} />
    </Box>
  )
}
