import { SxProps, Theme } from '@mui/system'

export const messageOptions: SxProps<Theme> = {
  width: '100%',
  bottom: '0%',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const messageBox: SxProps<Theme> = {
  width: '100%',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'background.default',
  borderRadius: '5vw',
  color: 'text.primary',
}

export const iconStyles: SxProps<Theme> = {
  marginLeft: '1rem',
}
