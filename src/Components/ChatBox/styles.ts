import { SxProps, Theme } from '@mui/system'

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
  margin: '0rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowY: 'scroll',
}
