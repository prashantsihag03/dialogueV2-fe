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
  width: '3rem',
  borderRadius: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '&:hover': {
    cursor: 'pointer',
  },
}

export const userDetailContainer: SxProps<Theme> = {
  width: '100%',
  marginLeft: '2%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}

export const optionContainer: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}

export const iconStyles: SxProps<Theme> = {
  marginLeft: '1.2rem',
}
