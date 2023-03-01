import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export const pointerCursor: SxProps<Theme> = {
  cursor: 'pointer',
}

export const displayModeBoxStyle: SxProps<Theme> = {
  height: '3em',
  width: '3rem',
  paddingRight: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
}

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
}

export const iconContainerStyles: SxProps<Theme> = {
  paddingRight: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}
