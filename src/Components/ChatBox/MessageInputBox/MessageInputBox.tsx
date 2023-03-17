import { Box, TextField } from '@mui/material'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'

import { iconStyles, messageBox, messageOptions } from './styles'

export const MessageInputBox: React.FC = () => {
  return (
    <Box sx={messageOptions}>
      <Box sx={messageBox}>
        <InsertEmoticonOutlinedIcon titleAccess="Emoticons" />
        <TextField
          id="standard-textarea"
          variant="standard"
          placeholder="Type your message here"
          multiline
          fullWidth
          maxRows={6}
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
    </Box>
  )
}
