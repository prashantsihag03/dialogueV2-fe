import { Box, ClickAwayListener, TextField } from '@mui/material'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import { iconStyles, messageBox, messageOptions } from './styles'
import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react'
import { useEffect, useState } from 'react'

export const MessageInputBox: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [showEmojis, setShowEmojis] = useState<boolean>(false)
  const [emoticonEle, setEmoticonEle] = useState<SVGSVGElement | null>(null)

  const [emojiPickerLeftpos, setEmojiPickerLeftpos] = useState<number | null>(
    null
  )
  const [emojiPickerBottompos, setEmojiPickerBottompos] = useState<
    number | null
  >(null)

  const addEmojiToInput = (emojiObject: EmojiClickData) => {
    setMessage(
      message + String.fromCodePoint(Number(`0x${emojiObject.unified}`))
    )
  }

  useEffect(() => {
    if (emoticonEle) {
      const rect = emoticonEle.getBoundingClientRect()
      setEmojiPickerLeftpos(rect.x)
      setEmojiPickerBottompos(window.innerHeight - rect.y + 20)
    }
  }, [emoticonEle])

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
      />
      {emojiPickerLeftpos != null &&
      emojiPickerBottompos != null &&
      showEmojis ? (
        <ClickAwayListener
          onClickAway={() => {
            setShowEmojis(false)
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: `${emojiPickerLeftpos}px`,
              bottom: `${emojiPickerBottompos}px`,
            }}
          >
            <EmojiPicker theme={Theme.AUTO} onEmojiClick={addEmojiToInput} />
          </Box>
        </ClickAwayListener>
      ) : null}
    </Box>
  )
}
