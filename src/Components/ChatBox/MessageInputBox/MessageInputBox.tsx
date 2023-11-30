import { Box, TextField } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import NorthIcon from '@mui/icons-material/North'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import { iconStyles, messageBox, messageOptions } from './styles'
import { EmojiClickData } from 'emoji-picker-react'
import { useState } from 'react'
import { useGetProfileQuery } from '../../../store/api/slice'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { getActiveConversation } from '../../../store/chats/selector'
import {
  OngoingMessageValue,
  addOngoingMessage,
} from '../../../store/onGoingMessages/slice'
import CustomEmojiPicker from './CustomEmojiPicker'
import { setShowLatestMsgInView } from '../../../store/chats/slice'

export const MessageInputBox: React.FC = () => {
  const appDispatch = useAppDispatch()
  const activeConversation = useAppSelector(getActiveConversation)
  const { data } = useGetProfileQuery(undefined)
  const [message, setMessage] = useState<string>('')

  const addEmojiToInput = (emojiObject: EmojiClickData) => {
    setMessage(
      message + String.fromCodePoint(Number(`0x${emojiObject.unified}`))
    )
  }

  const sendBtnClickHandler = () => {
    if (message.length < 1) {
      return
    }

    if (activeConversation?.conversationId == null || data?.id == null) {
      console.error('ConversationId couldnt be found')
      return
    }

    const localMessage: OngoingMessageValue = {
      conversationId: activeConversation.conversationId,
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
        receiver: activeConversation.profileId,
        localMessageId: localMessage.localMessageId,
        conversationId: localMessage.conversationId,
      },
    })
    appDispatch(setShowLatestMsgInView(true))
  }

  return (
    <Box sx={messageOptions} className="message-input-box">
      <Box sx={messageBox}>
        <CustomEmojiPicker addEmojiToInput={addEmojiToInput} />
        <TextField
          id="standard-textarea"
          variant="standard"
          placeholder="Type your message here"
          multiline
          fullWidth
          maxRows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value)
          }}
          InputProps={{ disableUnderline: true }}
          sx={{ marginLeft: '0.5rem' }}
        />
        <MicNoneOutlinedIcon
          sx={iconStyles}
          titleAccess="record audio message"
        />
        <AttachFileRoundedIcon
          sx={iconStyles}
          titleAccess="attach file/files"
        />
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
