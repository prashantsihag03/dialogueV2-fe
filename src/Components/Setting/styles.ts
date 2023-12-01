import { SxProps, Theme } from '@mui/material'

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '4%',
  overflowY: 'auto',
  overflowX: 'hidden',
}

export const headingStyles: SxProps<Theme> = {
  width: '100%',
  margin: '0.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
