import { Box, Stack, Typography } from '@mui/material'
import { secondary } from '../../Theme/colors'
import { container, message, profileContainer, subContainer } from './styles'
import { useGetProfileQuery } from '../../store/api/slice'
import MessageImage from './MessageImage'
import StatusIndicator from '../Commons/StatusIndicator'
import VideocamIcon from '@mui/icons-material/Videocam'

export interface IMessage {
  name: string
  timeStamp: string
  text: string
  source: 'incoming' | 'outgoing'
  status: 'sent' | 'pending' | 'failed'
  id?: string
  file?: string
  type?: 'message' | 'call'
}

export interface MessageProps extends IMessage {
  msgId?: string
  showProfilePic: boolean
  fileContent?: File
  autoDownloadAttachment?: boolean
  conversationId: string
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
  conversationId,
  type = 'message',
}: MessageProps) => {
  const { data: profileData } = useGetProfileQuery(name)

  console.log('type is:', type)

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
            borderTopRightRadius: source === 'outgoing' ? '0' : '0.5rem',
            borderTopLeftRadius: source === 'incoming' ? '0' : '0.5rem',
            backgroundColor: getBackgroundColor(status, source),
          }}
        >
          {status === 'pending' ? (
            <StatusIndicator status="loading" />
          ) : (
            <>
              {file || fileContent ? (
                <MessageImage
                  conversationId={conversationId}
                  msgId={msgId}
                  autoDownloadAttachment={autoDownloadAttachment}
                  status={status}
                  file={file}
                  fileContent={fileContent}
                  bottomPadding={text && text.length > 0 ? '0.5rem' : undefined}
                />
              ) : null}
              {type === 'call' ? (
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  padding={'0rem 0.5rem'}
                  borderRadius={0.5}
                  sx={{
                    backgroundColor:
                      source === 'outgoing' ? 'sheet.dark' : 'sheet.main',
                  }}
                >
                  <VideocamIcon
                    fontSize="large"
                    sx={{
                      color:
                        source === 'outgoing' ? 'primary.dark' : 'primary.main',
                    }}
                  />
                  Video Call
                </Stack>
              ) : null}
              {type === 'message' ? (
                <Typography sx={{ margin: '0rem 0.5rem' }}>{text}</Typography>
              ) : null}
            </>
          )}
        </Typography>
      </Box>
      <Box sx={{ width: '3rem' }}></Box>
    </Box>
  )
}
