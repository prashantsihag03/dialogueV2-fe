import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  padding: '0% 1%',
  height: '90%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
}

export const sectionStyles: SxProps<Theme> = {
  height: '100%',
  backgroundColor: 'background.paper',
  borderRadius: '1vw',
}

export const sideBarSectionStyles: SxProps<Theme> = {
  borderRadius: '1vw',
  flex: 1,
}

export const chatBoxSectionStyles: SxProps<Theme> = {
  flex: 3,
  marginRight: '10px',
  borderRadius: '1vw',
}
