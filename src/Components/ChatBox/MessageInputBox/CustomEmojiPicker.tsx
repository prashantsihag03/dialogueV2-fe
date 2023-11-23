import { Box, ClickAwayListener } from '@mui/material'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { useEffect, useState } from 'react'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'

interface EmojiPickerProps {
  addEmojiToInput: (emojiObject: EmojiClickData) => void
}

const CustomEmojiPicker: React.FC<EmojiPickerProps> = ({
  addEmojiToInput,
}: EmojiPickerProps) => {
  const [showEmojis, setShowEmojis] = useState<boolean>(false)
  const [emoticonEle, setEmoticonEle] = useState<SVGSVGElement | null>(null)

  const [emojiPickerLeftPos, setEmojiPickerLeftPos] = useState<number | null>(
    null
  )
  const [emojiPickerBottomPos, setEmojiPickerBottomPos] = useState<
    number | null
  >(null)

  useEffect(() => {
    if (!emoticonEle) return
    const rect = emoticonEle.getBoundingClientRect()
    setEmojiPickerLeftPos(rect.x)
    setEmojiPickerBottomPos(window.innerHeight - (rect.y - 20))
  }, [emoticonEle, setEmojiPickerLeftPos, setEmojiPickerBottomPos])

  return (
    <>
      <InsertEmoticonOutlinedIcon
        titleAccess="Emoticons"
        ref={(node) => setEmoticonEle(node)}
        onClick={() => {
          setShowEmojis(!showEmojis)
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
    </>
  )
}

export default CustomEmojiPicker
