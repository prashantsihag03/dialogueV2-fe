import { SxProps, Theme } from '@mui/system'

export const containerStyles: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '4%',
}

export const headingStyles: SxProps<Theme> = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const listActionStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}

export const chatsListStyles: SxProps<Theme> = {
  width: '100%',
  padding: '3% 0%',
  overflowX: 'auto',
}
