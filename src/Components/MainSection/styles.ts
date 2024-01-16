import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export const sideBarSectionStyles: SxProps<Theme> = {
  height: '100%',
  backgroundColor: 'background.paper',
  margin: '0% 0.5%',
  flex: 1,
  maxWidth: '350px',
  transition: 'all 0.3s ease-in-out',
}

export const chatBoxSectionStyles: SxProps<Theme> = {
  height: '100%',
  backgroundColor: 'background.paper',
  flex: 1,
  marginRight: '10px',
  transition: 'all 0.3s ease-in-out',
}
