import { Box, SxProps } from '@mui/material'
import { Theme } from '@mui/system'

const containerStyle: SxProps<Theme> = {
  width: '100%',
}

export const ChatBox: React.FC = () => {
  return <Box sx={containerStyle}></Box>
}
