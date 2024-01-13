import { Stack } from '@mui/material'
import {
  GetMsgAttachmentQueryParams,
  useGetMessageAttachmentQuery,
} from '../../store/api/slice'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import StatusIndicator from '../Commons/StatusIndicator'
import { useAppSelector } from '../../store/hooks'
import { getSideBarPreference } from '../../store/sidebar/selector'
import { useEffect, useState } from 'react'

interface MessageImageProps {
  fileContent?: File
  file?: string
  conversationId: string
  msgId: string | undefined
  autoDownloadAttachment?: boolean
  status: 'sent' | 'pending' | 'failed'
  bottomPadding?: string
}

const MessageImage: React.FC<MessageImageProps> = ({
  file,
  fileContent,
  conversationId,
  msgId,
  autoDownloadAttachment,
  status,
  bottomPadding,
}: MessageImageProps) => {
  const browser = useAppSelector(getSideBarPreference)
  const [attachmentQuery, setAttachmentQuery] =
    useState<GetMsgAttachmentQueryParams>({
      attachmentId: file ?? '',
      conversationId: conversationId,
      messageId: msgId ?? '',
    })
  const [fetchAttachment, setFetchAttachment] = useState<boolean>(false)

  const {
    data: attachmentData,
    isLoading,
    isError,
  } = useGetMessageAttachmentQuery(
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

  useEffect(() => {
    setFetchAttachment(false)
  }, [attachmentData])

  const getAttachmentDataToRender = () => {
    if (fileContent) return fileContent.toString()
    if (attachmentData) return `data:image;base64,${attachmentData}`
    return undefined
  }

  return file != null || fileContent != null ? (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      width={browser === 'mobile' ? '10rem' : '10rem'}
      paddingBottom={bottomPadding}
    >
      {attachmentData == null && file != null && fileContent == null ? (
        <Stack width={'10rem'} height={'10rem'} sx={{ position: 'relative' }}>
          <ImageOutlinedIcon
            sx={{
              width: '100%',
              height: '100%',
              opacity: '0.1',
            }}
          />
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            position="absolute"
            top={0}
            left={0}
            sx={{ backgroundColor: 'transparent' }}
          >
            {!isLoading && !isError ? (
              <FileDownloadOutlinedIcon
                sx={{ width: '4rem', height: '4rem', color: 'primary.main' }}
                onClick={() => {
                  if (msgId == null) {
                    return
                  }
                  setAttachmentQuery({
                    attachmentId: file,
                    conversationId: conversationId,
                    messageId: msgId,
                  })
                  setFetchAttachment(true)
                }}
              />
            ) : null}
            {isLoading ? (
              <StatusIndicator status="loading" loaderColor="primary" />
            ) : null}
            {isError ? <StatusIndicator status="error" /> : null}
          </Stack>
        </Stack>
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
  ) : null
}

export default MessageImage
