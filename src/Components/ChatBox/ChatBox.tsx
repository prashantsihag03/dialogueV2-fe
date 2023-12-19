import { Box, CircularProgress, Divider, Typography } from '@mui/material'
import { Header } from './Header/Header'
import { messages, noConversationContainerStyle } from './styles'
import MessageInputBox from './MessageInputBox'
import Message from '../Message'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import {
  getActiveConversation,
  getDraggingFiles,
  getShowLatestMsgInView,
} from '../../store/chats/selector'
import {
  IMessageData,
  useGetMessagesQuery,
  useGetProfileQuery,
} from '../../store/api/slice'
import { Stack } from '@mui/system'
import cleanTimeUTCInstant from '../../utils/date-time-utils'
import { useEffect, useRef, useState } from 'react'
import {
  OngoingMessageValue,
  addOngoingMessages,
  createEmptyConversation,
} from '../../store/onGoingMessages/slice'
import { getOngoingMessagesByConversationId } from '../../store/onGoingMessages/selector'
import {
  setDraggingFiles,
  setShowLatestMsgInView,
} from '../../store/chats/slice'
import Dropzone from 'react-dropzone'
import { setAttachmentByConvoId } from '../../store/inputMessages/slice'
import AttachmentPreview from './AttachmentPreview/AttachmentPreview'
import CallView from './CallView/CallView'

export const ChatBox: React.FC = () => {
  const appDispatch = useAppDispatch()
  const dropzoneRef = useRef<HTMLInputElement | null>(null)
  const { data: loggedProfileData } = useGetProfileQuery(undefined)
  const showLatestMsgOnDataChange = useAppSelector(getShowLatestMsgInView)
  const activeConversation = useAppSelector(getActiveConversation)
  const draggingFiles = useAppSelector(getDraggingFiles)
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

  const handleOpenFilePicker = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.click()
    }
  }

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
            file: msgApiResult.file,
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
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      padding="0.3rem"
      width="100%"
      height="100%"
      onDragEnter={() => {
        appDispatch(setDraggingFiles(true))
      }}
    >
      <Stack
        direction="column"
        width="100%"
        height="10%"
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
      <Stack
        direction="column"
        width="100%"
        height="80%"
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Dropzone
          onDrop={(acceptedFiles) => {
            appDispatch(
              setAttachmentByConvoId({
                convoId: activeConversation.conversationId,
                attachments: acceptedFiles,
              })
            )
            appDispatch(setDraggingFiles(false))
          }}
          onDragLeave={() => {
            appDispatch(setDraggingFiles(false))
          }}
          noClick={true}
          multiple={true}
          // accept={{ 'image/jpeg': ['.jpeg'] }}
          // maxSize={409600}
        >
          {({ getRootProps, getInputProps }) => (
            <Box
              component="section"
              sx={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: 'background.default',
                zIndex: draggingFiles ? 1000 : -100,
              }}
            >
              <Stack
                sx={{ height: '100%', width: '100%' }}
                component="div"
                direction="column"
                justifyContent="center"
                alignItems="center"
                {...getRootProps()}
              >
                <input {...getInputProps()} ref={dropzoneRef} />
                <InsertDriveFileIcon
                  sx={{ fontSize: '8.5rem', color: 'text.primary' }}
                />
                <Typography
                  variant="subtitle1"
                  fontSize="1.2rem"
                  textAlign="center"
                  width="70%"
                >
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </Typography>
              </Stack>
            </Box>
          )}
        </Dropzone>
        <AttachmentPreview conversationId={activeConversation.conversationId} />
        <CallView />
        <Box sx={messages}>
          {isFetching ? (
            <Stack
              direction={'row'}
              width={'100%'}
              height={'100%'}
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
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
                        file={msg.file}
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
      </Stack>
      <Box sx={{ width: '100%' }}>
        <MessageInputBox
          conversationId={activeConversation.conversationId}
          receiver={activeConversation.profileId}
          onAttachClick={handleOpenFilePicker}
        />
      </Box>
    </Stack>
  ) : (
    <Box sx={noConversationContainerStyle}>
      <Typography variant="body2" fontSize="1em">
        Select a conversation to display it here
      </Typography>
    </Box>
  )
}
