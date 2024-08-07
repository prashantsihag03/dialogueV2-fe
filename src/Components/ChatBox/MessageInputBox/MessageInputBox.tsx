import { Badge, Box, Stack, TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import NorthIcon from '@mui/icons-material/North'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
// import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import { iconStyles, messageBox, messageOptions } from './styles'
import { EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import {
  useGetProfileQuery,
  useGetUserSettingsQuery,
  // useSendAttachmentMutation,
} from '../../../store/api/slice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  OngoingMessageValue,
  addOngoingMessage,
} from '../../../store/onGoingMessages/slice'
// import CustomEmojiPicker from './CustomEmojiPicker'
import { setShowLatestMsgInView } from '../../../store/chats/slice'
import isTrue from '../../../utils/common-utils'
// import { getSideBarPreference } from '../../../store/sidebar/selector'
// import VerticalDotMenu from '../../VerticalDotMenu/VerticalDotMenu'
import { getInputMessageAttachmentsByConvoId } from '../../../store/inputMessages/selector'
import { setAttachmentByConvoId } from '../../../store/inputMessages/slice'
import { SocketEmitEvents } from '../../../store/middlewares/Socket/socket'

interface MessageInputBoxProps {
  onAttachClick: () => void
  conversationId: string
  receiver: string
}

export const MessageInputBox: React.FC<MessageInputBoxProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onAttachClick,
  conversationId,
  receiver,
}: MessageInputBoxProps) => {
  const appDispatch = useAppDispatch()
  // const browser = useAppSelector(getSideBarPreference)
  const attachments = useAppSelector(
    getInputMessageAttachmentsByConvoId(conversationId)
  )
  const { data: settingsData } = useGetUserSettingsQuery('enterSendsMessage')
  // const { sendAttachHttp, data: attachHttpResp } = useSendAttachmentMutation()
  const { data } = useGetProfileQuery(undefined)
  const [message, setMessage] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addEmojiToInput = (emojiObject: EmojiClickData) => {
    setMessage(
      message + String.fromCodePoint(Number(`0x${emojiObject.unified}`))
    )
  }

  const sendBtnClickHandler = () => {
    if (message.length < 1 && attachments.length < 1) {
      return
    }

    if (data?.id == null) {
      console.error('Invalid receiver userid.')
      return
    }

    const localMessage: OngoingMessageValue = {
      conversationId: conversationId,
      message: message,
      messageId: '',
      senderId: data?.id,
      timeStamp: 0,
      localMessageId: uuidv4(),
      status: 'pending',
    }

    setMessage('')
    appDispatch(addOngoingMessage(localMessage))
    appDispatch({
      type: SocketEmitEvents.message,
      payload: {
        text: localMessage.message,
        receiver: receiver,
        localMessageId: localMessage.localMessageId,
        conversationId: localMessage.conversationId,
        file: attachments[0],
      },
    })
    appDispatch(
      setAttachmentByConvoId({
        convoId: localMessage.conversationId,
        attachments: attachments.slice(1),
      })
    )
    appDispatch(setShowLatestMsgInView(true))
  }

  return (
    <Box sx={messageOptions} className="message-input-box">
      <Box sx={messageBox}>
        {/* <CustomEmojiPicker addEmojiToInput={addEmojiToInput} /> */}
        <TextField
          id="standard-textarea"
          variant="standard"
          placeholder="Type here"
          multiline
          fullWidth
          maxRows={6}
          value={message}
          onChange={(e) => {
            if (
              isTrue(settingsData?.enterSendsMessage) &&
              e.target.value === '\n'
            ) {
              return
            }
            setMessage(e.target.value)
          }}
          onKeyDown={
            isTrue(settingsData?.enterSendsMessage)
              ? (e) => {
                  if (e.code.toString() === 'Enter') {
                    sendBtnClickHandler()
                  }
                }
              : undefined
          }
          InputProps={{ disableUnderline: true, sx: { fontSize: '1rem' } }}
          sx={{ marginLeft: '0.5rem' }}
        />
        {/* {browser === 'mobile' ? (
          attachments.length > 0 ? (
            <Badge
              badgeContent={attachments.length}
              overlap="circular"
              color={'secondary'}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              variant="standard"
            >
              <VerticalDotMenu>
                <MenuItem>Record audio notes</MenuItem>
                <MenuItem
                  onClick={() => {
                    onAttachClick()
                  }}
                >
                  <Badge
                    badgeContent={attachments.length}
                    overlap="circular"
                    color={'secondary'}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    variant="standard"
                  >
                    <span
                      style={{
                        width: '0rem',
                        height: '0rem',
                        marginRight: '1rem',
                      }}
                    ></span>
                  </Badge>
                  Add attachment
                </MenuItem>
              </VerticalDotMenu>
            </Badge>
          ) : (
            <VerticalDotMenu>
              <MenuItem>Record audio notes</MenuItem>
              <MenuItem
                onClick={() => {
                  onAttachClick()
                }}
              >
                Add attachment
              </MenuItem>
            </VerticalDotMenu>
          )
        ) : (
          <> */}
        {/* <MicNoneOutlinedIcon
              sx={iconStyles}
              titleAccess="record audio message"
            /> */}
        {attachments.length > 0 ? (
          <Badge
            badgeContent={attachments.length}
            overlap="circular"
            color={'secondary'}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            variant="standard"
          >
            <AttachFileRoundedIcon
              sx={iconStyles}
              titleAccess="attach file/files"
              onClick={onAttachClick}
            />
          </Badge>
        ) : (
          <AttachFileRoundedIcon
            sx={iconStyles}
            titleAccess="attach file/files"
            onClick={onAttachClick}
          />
        )}
        {/* </>
        )} */}
      </Box>
      <Badge
        badgeContent={attachments.length}
        overlap="circular"
        color={'secondary'}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        variant="standard"
      >
        <Stack sx={iconStyles}>
          <NorthIcon
            fontSize="large"
            sx={{
              color: 'white',
              backgroundColor: 'secondary.light',
              borderRadius: '7px',
              '&:hover': {
                color: 'white',
                backgroundColor: 'secondary.light',
              },
              '&:active': {
                color: 'white',
                backgroundColor: 'secondary.light',
              },
            }}
            titleAccess="send message"
            onClick={
              (message.length < 1 && attachments.length < 1) || data?.id == null
                ? undefined
                : sendBtnClickHandler
            }
          />
        </Stack>
      </Badge>
    </Box>
  )
}
