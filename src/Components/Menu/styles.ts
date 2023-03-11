import { SxProps, Theme } from '@mui/system'

export const pointerCursor: SxProps<Theme> = {
  cursor: 'pointer',
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

export const textItemStyles: SxProps<Theme> = {
  '&:after': {
    transition: 'all ease-in-out .2s',
    background: 'none repeat scroll 0 0',
    backgroundColor: 'secondary.main',
    content: '""',
    display: 'block',
    height: '1px',
    width: '0',
  },

  '&:hover:after': {
    width: '100%',
  },

  '&:hover': {
    color: 'secondary.main',
    cursor: 'pointer',
  },
}
