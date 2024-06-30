import { SxProps, Theme } from '@mui/material'

export const container: SxProps<Theme> = {
  width: '100%',
  padding: '1rem 0.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
}

export const subContainer: SxProps<Theme> = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
}

export const profileContainer: SxProps<Theme> = {
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}

export const message: SxProps<Theme> = {
  padding: '0.4rem',
  maxWidth: '600px',
  letterSpacing: '0.7pt',
  backgroundColor: 'background.default',
  borderRadius: '0.5rem',
}
