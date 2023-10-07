import { SxProps, Theme } from '@mui/system'

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  minWidth: '250px',
  marginBottom: '0.5rem',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'action.hover',
  },
}

export const subContainerStyles: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '2%',
  transition: 'all 0.35s linear',
}

export const profileContainerStyle: SxProps<Theme> = {
  width: '10%',
  minWidth: '40px',
  borderRadius: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}

export const contentContainerStyles: SxProps<Theme> = {
  width: '90%',
  padding: '0 3%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const contentMainTextStyles: SxProps<Theme> = {
  display: 'flex',
  width: '85%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  marginRight: '1%',
}

export const chatIndicatorStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const chatUnSeenMsgContainerStyles: SxProps<Theme> = {
  minWidth: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 0.15rem',
  paddingTop: '0.15rem',
  backgroundColor: '#2b6bff',
  borderRadius: '100vw',
}
