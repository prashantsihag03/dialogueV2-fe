import { Components } from '@mui/material'
import { Theme } from '@mui/system'
import { DisplayMode } from './types'

export const getComponentsTheme = (
  mode: DisplayMode
): Components<Omit<Theme, 'components'>> => {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        colorPrimary: mode === 'dark' ? '#f7f7f7' : '#575757',
        root: {
          color: mode === 'dark' ? '#e1e1e1' : '#575757',
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            textTransform: 'none',
            padding: '0.8rem 1rem',
            fontSize: '1.1rem',
            ['@media only screen and (max-width: 600px)']: {
              fontSize: '1rem',
              padding: '0.6rem 0.8rem',
            },
          },
        },
      ],
    },
    MuiLink: {
      styleOverrides: {
        root: { textDecoration: 'none' },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          '&:hover': {
            cursor:
              mode === 'dark'
                ? "url('./images/whiteReadMoreCursor.svg'), pointer"
                : "url('./images/darkReadMoreCursor.svg'), pointer",
          },
        },
      },
    },
  }
}
