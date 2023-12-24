import { SxProps, Theme } from '@mui/system'

export const containerStyle: SxProps<Theme> = {
  width: '100%',
  padding: '0.5rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const profileContainer: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
}

export const pictureContainer: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}

export const userDetailContainer: SxProps<Theme> = {
  marginLeft: '0.2rem',
  padding: '0.5rem 0.7rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  color: 'primary.main',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'action.hover',
    color: 'secondary.main',
  },
  '&:active': {
    cursor: 'pointer',
    backgroundColor: 'action.hover',
    color: 'secondary.main',
  },
}

export const optionContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

export const iconStyles: SxProps<Theme> = {
  marginLeft: '1.2rem',
}
