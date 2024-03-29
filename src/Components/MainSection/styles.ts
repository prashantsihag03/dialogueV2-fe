import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  padding: '0% 1%',
  height: '90%',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
}

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
  margin: '0% 0.5%',
  flex: 1,
  marginRight: '10px',
  transition: 'all 0.3s ease-in-out',
}
