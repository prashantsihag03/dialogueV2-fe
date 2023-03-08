import { SxProps, Theme } from '@mui/system'

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: '2%',
  borderRadius: '0.2vw',
  borderBottom: '1px solid transparent',
  marginBottom: '1rem',
  transition: 'all 0.35s linear',
  '&:hover': {
    cursor: 'pointer',
    borderColor: '#8dafff',
    // backgroundColor: '#454b58', //dark BG
    // backgroundColor: '#dce8ff', // white BG
  },
}

export const profileContainerStyle: SxProps<Theme> = {
  width: '15%',
  borderRadius: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
}

export const contentContainerStyles: SxProps<Theme> = {
  width: '95%',
  padding: '0 3%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const contentMainTextStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}

export const chatIndicatorStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const chatUnSeenMsgContainerStyles: SxProps<Theme> = {
  minWidth: '1.8rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '0.15rem',
  backgroundColor: '#2b6bff',
  borderRadius: '100vw',
}
