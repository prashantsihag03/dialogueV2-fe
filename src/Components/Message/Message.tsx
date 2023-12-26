import { Box, Button, Stack, Typography } from '@mui/material'
import { secondary } from '../../Theme/colors'
import { container, message, profileContainer, subContainer } from './styles'
import {
  GetMsgAttachmentQueryParams,
  useGetMessageAttachmentQuery,
  useGetProfileQuery,
} from '../../store/api/slice'
import { useAppSelector } from '../../store/hooks'
import { getActiveConversation } from '../../store/chats/selector'
import { useEffect, useState } from 'react'
import { getSideBarPreference } from '../../store/sidebar/selector'

export interface IMessage {
  name: string
  timeStamp: string
  text: string
  source: 'incoming' | 'outgoing'
  status: 'sent' | 'pending' | 'failed'
  id?: string
  file?: string
}

export interface MessageProps extends IMessage {
  msgId?: string
  showProfilePic: boolean
  fileContent?: File
  autoDownloadAttachment?: boolean
}

const getBackgroundColor = (
  status: 'sent' | 'pending' | 'failed',
  source: 'outgoing' | 'incoming'
) => {
  if (status === 'pending') {
    return 'action.hover'
  }
  if (status === 'failed') {
    return 'maroon'
  }
  return source === 'outgoing' ? secondary.light : 'background.default'
}

export const Message: React.FC<MessageProps> = ({
  name,
  timeStamp,
  text,
  source,
  status,
  id,
  file,
  showProfilePic,
  fileContent,
  msgId,
  autoDownloadAttachment,
}: MessageProps) => {
  const browser = useAppSelector(getSideBarPreference)
  const { data: profileData } = useGetProfileQuery(name)
  const activeConversation = useAppSelector(getActiveConversation)
  const [attachmentQuery, setAttachmentQuery] =
    useState<GetMsgAttachmentQueryParams>({
      attachmentId: file ?? '',
      conversationId: activeConversation?.conversationId ?? '',
      messageId: msgId ?? '',
    })
  const [fetchAttachment, setFetchAttachment] = useState<boolean>(false)
  const { data: attachmentData } = useGetMessageAttachmentQuery(
    {
      attachmentId: attachmentQuery.attachmentId,
      conversationId: attachmentQuery.conversationId,
      messageId: attachmentQuery.messageId,
    },
    {
      skip:
        (fetchAttachment === false && autoDownloadAttachment === false) ||
        status !== 'sent',
    }
  )

  const getAttachmentDataToRender = () => {
    if (fileContent) return fileContent.toString()
    if (attachmentData) return `data:image;base64,${attachmentData}`
    return undefined
  }

  useEffect(() => {
    setFetchAttachment(false)
  }, [attachmentData])

  return (
    <Box
      className={id ? `${id}-message-container` : undefined}
      sx={{
        ...container,
        flexDirection: source === 'incoming' ? 'row' : 'row-reverse',
      }}
    >
      {showProfilePic ? (
        <Box sx={{ ...subContainer, maxWidth: '50px', minWidth: '30px' }}>
          <Box
            sx={{
              ...profileContainer,
              width: '2rem',
              height: '2rem',
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
          >
            <img
              style={{ width: '100%' }}
              src={`data:image;base64,${profileData?.profileImg}`}
              alt={`${name}'s profile`}
            />
          </Box>
          <Typography variant="subtitle1">{timeStamp}</Typography>
        </Box>
      ) : null}
      <Box
        sx={{
          ...subContainer,
          flex: '5',
          alignItems: source === 'incoming' ? 'flex-start' : 'flex-end',
        }}
      >
        <Typography variant="subtitle1">
          {source === 'outgoing' ? 'you' : name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...message,
            color: source === 'outgoing' ? 'white' : 'palette.text.primary',
            backgroundColor: getBackgroundColor(status, source),
          }}
        >
          {file != null || fileContent != null ? (
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              width={browser === 'mobile' ? '6rem' : '15rem'}
              marginBottom="1rem"
            >
              {attachmentData == null && file != null && fileContent == null ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    if (
                      activeConversation?.conversationId == null ||
                      msgId == null
                    ) {
                      return
                    }
                    setAttachmentQuery({
                      attachmentId: file,
                      conversationId: activeConversation?.conversationId,
                      messageId: msgId,
                    })
                    setFetchAttachment(true)
                  }}
                >
                  Download Attachment
                </Button>
              ) : null}
              {attachmentData != null || fileContent != null ? (
                <img
                  src={getAttachmentDataToRender()}
                  alt="img"
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: 'contain',
                  }}
                />
              ) : null}
            </Stack>
          ) : null}
          {text}
        </Typography>
      </Box>
      <Box sx={{ width: '3rem' }}></Box>
    </Box>
  )
}
