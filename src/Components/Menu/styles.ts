import { SxProps, Theme } from '@mui/system'

export const pointerCursor: SxProps<Theme> = {
  cursor: 'pointer',
}

export const containerStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
}

export const sideBarContainerStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '4%',
}

export const sideBarListStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  padding: '3% 0%',
  overflowX: 'auto',
}

export const sideBarActionStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const iconContainerStyles: SxProps<Theme> = {
  marginRight: '20px',
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

export const connectivityStatusStyles: SxProps<Theme> = {
  position: 'absolute',
  width: '0.5rem',
  height: '0.5rem',
  borderRadius: '50vw',
  right: '-25%',
}
