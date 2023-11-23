import { SxProps, Theme } from '@mui/system'

export const containerStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '0.3rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const noConversationContainerStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '0.3rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

export const chatContainer: SxProps<Theme> = {
  width: '100%',
  padding: '1rem',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  overflowY: 'scroll',
}

export const messages: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowY: 'scroll',
}
