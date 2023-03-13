import { SxProps, Theme } from '@mui/system'

export const containerStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '0.3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export const chatContainer: SxProps<Theme> = {
  width: '100%',
  height: '90%',
  padding: '0.3rem',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const messages: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '0.3rem',
  paddingBottom: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const messageOptions: SxProps<Theme> = {
  width: '100%',
  position: 'absolute',
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
