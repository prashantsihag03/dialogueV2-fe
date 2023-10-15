import { Box, Divider, Typography } from '@mui/material'
import { Header } from './Header/Header'
import {
  chatBoxHeadingContainerStyle,
  containerStyle,
  messages,
  noConversationContainerStyle,
} from './styles'
import MessageInputBox from './MessageInputBox'
import Message from '../Message'
import { useAppSelector } from '../../store/hooks'
import { getActiveConversation } from '../../store/chats/selector'
import { useGetMessagesQuery } from '../../store/api/slice'
import { Stack } from '@mui/system'

export const ChatBox: React.FC = () => {
  const activeConversation = useAppSelector(getActiveConversation)
  const { isFetching, data } = useGetMessagesQuery(undefined, {
    skip: !Boolean(activeConversation?.conversationId),
  })
  return activeConversation ? (
    <Box sx={containerStyle}>
      <Box sx={chatBoxHeadingContainerStyle}>
        <Header
          userId={activeConversation.conversationId}
          fullName={activeConversation.conversationName}
          online={true}
        />
        <Divider color="primary" sx={{ width: '100%' }} />
      </Box>
      <Box sx={messages}>
        {isFetching ? (
          <Stack direction={'row'} width={'100%'} height={'100%'}>
            <Typography variant="body1">Loading</Typography>
          </Stack>
        ) : null}
        {data
          ? data.map((msg) => (
              <Message
                key={msg.messageId}
                name={msg.senderUserId}
                timeStamp={msg.timestamp}
                source={msg.source}
                text={msg.text}
              />
            ))
          : null}
      </Box>
      <Box sx={{ width: '100%', paddingTop: '2rem' }}>
        <MessageInputBox />
      </Box>
    </Box>
  ) : (
    <Box sx={noConversationContainerStyle}>
      <Typography variant="h2">
        Select a conversation to display it here
      </Typography>
    </Box>
  )
}
