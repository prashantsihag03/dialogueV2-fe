import { Components } from '@mui/material'
import { Theme } from '@mui/system'
import { icon, secondary } from './colors'
import { DisplayMode } from './types'

export const getComponentsTheme = (
  mode: DisplayMode
): Components<Omit<Theme, 'components'>> => {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? icon.light : icon.dark,
          backgroundColor: 'transparent',
          '&:hover': {
            color: mode === 'light' ? secondary.light : secondary.dark,
            cursor: 'pointer',
          },
        },
      },
      defaultProps: {
        fontSize: 'medium',
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
  }
}
