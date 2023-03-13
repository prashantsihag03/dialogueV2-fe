import { Box, Divider, TextField } from '@mui/material'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import { Header, IActiveChatHeader } from './Header/Header'
import {
  chatContainer,
  containerStyle,
  iconStyles,
  messageBox,
  messageOptions,
  messages,
} from './styles'

export type IChatBox = IActiveChatHeader

export const ChatBox: React.FC<IChatBox> = ({ name, online }: IChatBox) => {
  return (
    <Box sx={containerStyle}>
      <Header name={name} online={online} />
      <Divider color="primary" sx={{ width: '100%' }} />
      <Box sx={chatContainer}>
        <Box sx={messages}></Box>
        <Box sx={messageOptions}>
          <Box sx={messageBox}>
            <InsertEmoticonOutlinedIcon />
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
            <MicNoneOutlinedIcon sx={iconStyles} />
            <AttachFileRoundedIcon sx={iconStyles} />
          </Box>
          <SendRoundedIcon fontSize="large" sx={iconStyles} />
        </Box>
      </Box>
    </Box>
  )
}
