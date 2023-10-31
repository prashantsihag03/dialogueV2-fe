import { Box, ClickAwayListener, TextField } from '@mui/material'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import { iconStyles, messageBox, messageOptions } from './styles'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'
import { useEffect, useState } from 'react'
import {
  useGetProfileQuery,
  useSendMessageMutation,
} from '../../../store/api/slice'
import { useAppSelector } from '../../../store/hooks'
import { getActiveConversation } from '../../../store/chats/selector'

export const MessageInputBox: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const activeConversation = useAppSelector(getActiveConversation)
  const { data } = useGetProfileQuery(undefined)
  const [sendMessageMutation] = useSendMessageMutation()
  const [showEmojis, setShowEmojis] = useState<boolean>(false)
  const [emoticonEle, setEmoticonEle] = useState<SVGSVGElement | null>(null)

  const [emojiPickerLeftPos, setEmojiPickerLeftPos] = useState<number | null>(
    null
  )
  const [emojiPickerBottomPos, setEmojiPickerBottomPos] = useState<
    number | null
  >(null)

  const addEmojiToInput = (emojiObject: EmojiClickData) => {
    setMessage(
      message + String.fromCodePoint(Number(`0x${emojiObject.unified}`))
    )
  }

  useEffect(() => {
    if (!emoticonEle) return
    const rect = emoticonEle.getBoundingClientRect()
    setEmojiPickerLeftPos(rect.x)
    setEmojiPickerBottomPos(window.innerHeight - (rect.y - 20))
  }, [emoticonEle, setEmojiPickerLeftPos, setEmojiPickerBottomPos])

  return (
    <Box sx={messageOptions}>
      <Box sx={messageBox}>
        <InsertEmoticonOutlinedIcon
          titleAccess="Emoticons"
          ref={(node) => setEmoticonEle(node)}
          onClick={() => {
            setShowEmojis(!showEmojis)
          }}
        />
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
      <SendRoundedIcon
        fontSize="large"
        sx={iconStyles}
        titleAccess="send message"
        onClick={() => {
          if (activeConversation?.conversationId == null || data?.id == null) {
            console.error('ConversationId couldnt be found')
            return
          }
          sendMessageMutation({
            conversationId: activeConversation.conversationId,
            messageId: '',
            senderUserId: data?.id,
            source: 'outgoing',
            text: message,
            timestamp: '',
          })
        }}
      />
      {emojiPickerLeftPos != null &&
      emojiPickerBottomPos != null &&
      showEmojis ? (
        <ClickAwayListener
          onClickAway={() => {
            setShowEmojis(false)
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: `${emojiPickerLeftPos}px`,
              bottom: `${emojiPickerBottomPos}px`,
            }}
          >
            <EmojiPicker theme={Theme.AUTO} onEmojiClick={addEmojiToInput} />
          </Box>
        </ClickAwayListener>
      ) : null}
    </Box>
  )
}
