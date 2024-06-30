import { SxProps, Theme } from '@mui/system'

export const contentBoxStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '3% 0%',
  overflowX: 'auto',
}

export const actionIconStyles: SxProps<Theme> = {
  marginLeft: '0.5rem',
  '&:hover': {
    color: 'secondary.main',
    cursor: 'pointer',
  },
  '&:active': {
    color: 'secondary.main',
    cursor: 'pointer',
  },
}
