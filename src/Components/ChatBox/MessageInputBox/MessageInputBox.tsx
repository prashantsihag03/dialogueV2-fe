import { Box, MenuItem, TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import NorthIcon from '@mui/icons-material/North'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import { iconStyles, messageBox, messageOptions } from './styles'
import { EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import {
  useGetProfileQuery,
  useGetUserSettingsQuery,
} from '../../../store/api/slice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import {
  OngoingMessageValue,
  addOngoingMessage,
} from '../../../store/onGoingMessages/slice'
// import CustomEmojiPicker from './CustomEmojiPicker'
import { setShowLatestMsgInView } from '../../../store/chats/slice'
import isTrue from '../../../utils/common-utils'
import { getSideBarPreference } from '../../../store/sidebar/selector'
import VerticalDotMenu from '../../VerticalDotMenu/VerticalDotMenu'
// import { getInputMessageAttachmentsByConvoId } from '../../../store/inputMessages/selector'

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
  const browser = useAppSelector(getSideBarPreference)
  // const attachments = useAppSelector(
  //   getInputMessageAttachmentsByConvoId(conversationId)
  // )
  const { data: settingsData } = useGetUserSettingsQuery('enterSendsMessage')
  const { data } = useGetProfileQuery(undefined)
  const [message, setMessage] = useState<string>('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addEmojiToInput = (emojiObject: EmojiClickData) => {
    setMessage(
      message + String.fromCodePoint(Number(`0x${emojiObject.unified}`))
    )
  }

  const sendBtnClickHandler = () => {
    if (message.length < 1) {
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
      type: 'socket/message',
      payload: {
        text: localMessage.message,
        receiver: receiver,
        localMessageId: localMessage.localMessageId,
        conversationId: localMessage.conversationId,
      },
    })
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
          InputProps={{ disableUnderline: true }}
          sx={{ marginLeft: '0.5rem' }}
        />
        {browser ? (
          <>
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
          </>
        ) : (
          <>
            <MicNoneOutlinedIcon
              sx={iconStyles}
              titleAccess="record audio message"
            />
            <AttachFileRoundedIcon
              sx={iconStyles}
              titleAccess="attach file/files"
              onClick={onAttachClick}
            />
          </>
        )}
      </Box>
      <NorthIcon
        fontSize="large"
        sx={{
          ...iconStyles,
          color: 'white',
          backgroundColor: 'secondary.light',
          '&:hover': {
            color: 'white',
            backgroundColor: 'secondary.light',
          },
        }}
        titleAccess="send message"
        onClick={sendBtnClickHandler}
      />
    </Box>
  )
}
