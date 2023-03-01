import { Palette } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

// eslint-disable-next-line no-unused-vars
export const getTypographyTheme = (palette: Palette): TypographyOptions => {
  return {
    allVariants: {
      color: palette.text.primary,
      letterSpacing: '0.5pt',
      fontFamily:
        palette.mode === 'light'
          ? '"Roboto Slab Regular", "Helvetica", -apple-system, system-ui, serif'
          : '"Roboto Slab Light", "Helvetica", -apple-system, system-ui, serif',
    },
    h2: {
      fontSize: '1.8rem',
    },
    h5: {
      fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
    },
    subtitle1: {
      color: palette.text.secondary,
      fontSize: '1.2rem',
      ['@media only screen and (max-width: 1000px)']: {
        fontSize: '1rem',
      },
    },
    subtitle2: {
      color: palette.secondary.main,
      fontSize: '1.2rem',
      lineHeight: '1.5rem',
      ['@media only screen and (max-width: 1000px)']: {
        fontSize: '1rem',
      },
    },
    body1: {
      color: palette.text.secondary,
      fontSize: '1rem',
    },
    body2: {
      fontSize: 'clamp(50px, 5vw, 60px)',
      fontWeight: 900,
      fontFamily: '"Roboto Slab Bold", -apple-system, system-ui, serif',
    },
  }
}
