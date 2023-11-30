import { Box, Divider, Typography } from '@mui/material'
import { Header } from './Header/Header'
import {
  containerStyle,
  messages,
  noConversationContainerStyle,
} from './styles'
import MessageInputBox from './MessageInputBox'
import Message from '../Message'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getActiveConversation,
  getShowLatestMsgInView,
} from '../../store/chats/selector'
import {
  IMessageData,
  useGetMessagesQuery,
  useGetProfileQuery,
} from '../../store/api/slice'
import { Stack } from '@mui/system'
import cleanTimeUTCInstant from '../../utils/date-time-utils'
import { useEffect, useState } from 'react'
import {
  OngoingMessageValue,
  addOngoingMessages,
  createEmptyConversation,
} from '../../store/onGoingMessages/slice'
import { getOngoingMessagesByConversationId } from '../../store/onGoingMessages/selector'
import { setShowLatestMsgInView } from '../../store/chats/slice'

export const ChatBox: React.FC = () => {
  const appDispatch = useAppDispatch()
  const { data: loggedProfileData } = useGetProfileQuery(undefined)
  const showLatestMsgOnDataChange = useAppSelector(getShowLatestMsgInView)
  const activeConversation = useAppSelector(getActiveConversation)
  const onGoingMessages = useAppSelector(
    getOngoingMessagesByConversationId(activeConversation?.conversationId || '')
  )
  const [msgBoxEle, setMsgBoxEle] = useState<HTMLDivElement | null>(null)
  const { isFetching, isSuccess, data } = useGetMessagesQuery(
    activeConversation?.conversationId || '',
    {
      skip: !Boolean(activeConversation?.conversationId),
    }
  )

  useEffect(() => {
    if (showLatestMsgOnDataChange && msgBoxEle) {
      msgBoxEle.scrollIntoView({
        behavior: 'smooth',
      })
      appDispatch(setShowLatestMsgInView(false))
    }
  }, [appDispatch, onGoingMessages, msgBoxEle, showLatestMsgOnDataChange])

  useEffect(() => {
    if (
      !isFetching &&
      isSuccess &&
      data &&
      activeConversation?.conversationId
    ) {
      const oldMessages: OngoingMessageValue[] = data.map(
        (msgApiResult: IMessageData) => {
          return {
            conversationId: activeConversation.conversationId,
            messageId: msgApiResult.messageId,
            timeStamp: Number(msgApiResult.timestamp),
            message: msgApiResult.text,
            senderId: msgApiResult.senderUserId,
            status: 'sent',
            localMessageId: '',
          }
        }
      )
      if (oldMessages.length > 0) {
        appDispatch(addOngoingMessages(oldMessages))
        return
      }
      appDispatch(createEmptyConversation(activeConversation?.conversationId))
    }
  }, [data])

  useEffect(() => {
    if (msgBoxEle) {
      // Calculate the scroll height and scroll to the bottom
      msgBoxEle.scrollIntoView({
        behavior: 'instant',
      })
    }
  }, [msgBoxEle])

  return activeConversation ? (
    <Box sx={containerStyle}>
      <Stack
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Header
          userId={activeConversation.profileId}
          fullName={activeConversation.conversationName}
          online={true}
        />
        <Divider color="primary" sx={{ width: '100%' }} />
      </Stack>
      <Box
        sx={messages}
        onScroll={(e) => {
          console.log(e)
        }}
      >
        {isFetching ? (
          <Stack direction={'row'} width={'100%'} height={'100%'}>
            <Typography variant="body1">Loading</Typography>
          </Stack>
        ) : null}
        {data &&
        loggedProfileData &&
        onGoingMessages &&
        onGoingMessages.length > 0
          ? onGoingMessages.map((msg, index) => {
              if (onGoingMessages.length - 1 === index) {
                return (
                  <>
                    <Message
                      key={msg.messageId}
                      id="latest"
                      name={msg.senderId}
                      timeStamp={cleanTimeUTCInstant(msg.timeStamp)}
                      source={
                        msg.senderId === loggedProfileData.id
                          ? 'outgoing'
                          : 'incoming'
                      }
                      text={msg.message}
                      status={msg.status}
                    />
                    <div
                      ref={(node) => {
                        setMsgBoxEle(node)
                      }}
                    ></div>
                  </>
                )
              }
              return (
                <Message
                  key={msg.messageId}
                  name={msg.senderId}
                  timeStamp={cleanTimeUTCInstant(msg.timeStamp)}
                  source={
                    msg.senderId === loggedProfileData.id
                      ? 'outgoing'
                      : 'incoming'
                  }
                  text={msg.message}
                  status={msg.status}
                />
              )
            })
          : null}

        {data &&
        loggedProfileData &&
        onGoingMessages &&
        onGoingMessages.length == 0 ? (
          <Box sx={noConversationContainerStyle}>
            <Typography variant="body2" fontSize="1em">
              No messages to display.
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ width: '100%', paddingTop: '2rem' }}>
        <MessageInputBox />
      </Box>
    </Box>
  ) : (
    <Box sx={noConversationContainerStyle}>
      <Typography variant="body2" fontSize="1em">
        Select a conversation to display it here
      </Typography>
    </Box>
  )
}
