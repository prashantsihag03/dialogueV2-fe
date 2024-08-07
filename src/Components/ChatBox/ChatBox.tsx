import { Box, CircularProgress, Typography } from '@mui/material'
import { Header } from './Header/Header'
import { messages } from './styles'
import MessageInputBox from './MessageInputBox'
import Message from '../Message'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import SmsIcon from '@mui/icons-material/Sms'
import {
  getActiveConversation,
  getDraggingFiles,
  getShowLatestMsgInView,
} from '../../store/chats/selector'
import {
  IMessageData,
  useGetMessagesQuery,
  useGetProfileQuery,
  useGetUserSettingsQuery,
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
import {
  addAttachmentByConvoId,
  setAttachmentByConvoId,
} from '../../store/inputMessages/slice'
import AttachmentPreview from './AttachmentPreview/AttachmentPreview'
import { getSideBarPreference } from '../../store/sidebar/selector'
import isTrue from '../../utils/common-utils'

export const ChatBox: React.FC = () => {
  const appDispatch = useAppDispatch()
  const dropzoneRef = useRef<HTMLInputElement | null>(null)
  const { data: loggedProfileData } = useGetProfileQuery(undefined)
  const { data: compactConversationView } = useGetUserSettingsQuery(
    'compactConversationView'
  )
  const browser = useAppSelector(getSideBarPreference)
  const showLatestMsgOnDataChange = useAppSelector(getShowLatestMsgInView)
  const activeConversation = useAppSelector(getActiveConversation)
  const [addingMoreAttach, setAddingMoreAttach] = useState<boolean>(false)
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
            type: msgApiResult.type,
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
      padding={browser === 'mobile' ? '0rem' : '0.3rem'}
      width="100%"
      height="100%"
      onDragEnter={() => {
        appDispatch(setDraggingFiles(true))
      }}
    >
      <Header
        userId={activeConversation.profileId}
        fullName={activeConversation.conversationName}
        conversationId={activeConversation.conversationId}
      />
      <Stack
        direction="column"
        width="100%"
        height={'75%'}
        justifyContent="center"
        alignItems="center"
        position="relative"
      >
        <Dropzone
          onDrop={(acceptedFiles) => {
            if (addingMoreAttach) {
              appDispatch(
                addAttachmentByConvoId({
                  convoId: activeConversation.conversationId,
                  attachments: acceptedFiles,
                })
              )
              setAddingMoreAttach(false)
            } else {
              appDispatch(
                setAttachmentByConvoId({
                  convoId: activeConversation.conversationId,
                  attachments: acceptedFiles,
                })
              )
            }
            appDispatch(setDraggingFiles(false))
          }}
          onDragLeave={() => {
            appDispatch(setDraggingFiles(false))
          }}
          noClick={true}
          multiple={true}
          accept={{ 'image/jpeg': ['.jpeg'], 'image/png': ['.png'] }}
          maxSize={8388608}
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
        <AttachmentPreview
          conversationId={activeConversation.conversationId}
          addAttachmentHandler={() => {
            setAddingMoreAttach(true)
            handleOpenFilePicker()
          }}
        />
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
          compactConversationView &&
          onGoingMessages.length > 0
            ? onGoingMessages.map((msg, index) => {
                if (onGoingMessages.length - 1 === index) {
                  return (
                    <>
                      <Message
                        key={msg.messageId}
                        conversationId={activeConversation.conversationId}
                        autoDownloadAttachment={
                          msg.localMessageId ? true : false
                        }
                        msgId={msg.messageId}
                        showProfilePic={
                          !isTrue(
                            compactConversationView.compactConversationView
                          )
                        }
                        id="latest"
                        name={msg.senderId}
                        fileContent={msg.fileContent}
                        timeStamp={cleanTimeUTCInstant(msg.timeStamp)}
                        source={
                          msg.senderId === loggedProfileData.id
                            ? 'outgoing'
                            : 'incoming'
                        }
                        text={msg.message}
                        status={msg.status}
                        file={msg.file}
                        type={msg.type}
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
                    autoDownloadAttachment={msg.localMessageId ? true : false}
                    msgId={msg.messageId}
                    fileContent={msg.fileContent}
                    showProfilePic={
                      !isTrue(compactConversationView.compactConversationView)
                    }
                    name={msg.senderId}
                    timeStamp={cleanTimeUTCInstant(msg.timeStamp)}
                    conversationId={activeConversation.conversationId}
                    source={
                      msg.senderId === loggedProfileData.id
                        ? 'outgoing'
                        : 'incoming'
                    }
                    text={msg.message}
                    status={msg.status}
                    file={msg.file}
                    type={msg.type}
                  />
                )
              })
            : null}

          {data &&
          loggedProfileData &&
          onGoingMessages &&
          onGoingMessages.length == 0 ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              width="100%"
              height="100%"
              padding="0.3rem"
            >
              <Typography variant="body2" fontSize="1em">
                No messages to display.
              </Typography>
            </Stack>
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
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      padding="0.3rem"
    >
      <SmsIcon sx={{ width: '2.5rem', height: '2rem' }} />
      <Typography variant="body2" fontSize="1rem">
        Select a conversation to display it here
      </Typography>
    </Stack>
  )
}
