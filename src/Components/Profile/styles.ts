import { SxProps, Theme } from '@mui/system'

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

export const headerContainerStyles: SxProps<Theme> = {
  width: '100%',
  margin: '0.5rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const actionStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const chatsListStyles: SxProps<Theme> = {
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
}

export const bottomMenuStyles: SxProps<Theme> = {
  width: '100%',
  paddingTop: '0.3rem',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
