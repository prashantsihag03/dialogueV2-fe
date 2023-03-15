import { SxProps, Theme } from '@mui/material'

export const container: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
}

export const subContainer: SxProps<Theme> = {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}

export const profileContainer: SxProps<Theme> = {
  width: '10%',
  minWidth: '40px',
  borderRadius: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}

export const message: SxProps<Theme> = {
  padding: '1rem',
  backgroundColor: 'background.default',
  borderRadius: '0.5rem',
}
