import { Palette } from '@mui/material'
import { TypographyOptions } from '@mui/material/styles/createTypography'

// eslint-disable-next-line no-unused-vars
export const getTypographyTheme = (
  palette: Palette,
  isMobile: boolean
): TypographyOptions => {
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
      letterSpacing: '0.7pt',
      fontSize: isMobile ? '1.5rem' : '1.2rem',
      fontWeight: 'bold',
    },
    h3: {
      letterSpacing: '0.7pt',
      fontSize: '1rem',
      fontWeight: 'bold',
    },
    body1: {
      color: palette.text.primary,
      fontSize: isMobile ? '0.8rem' : '1rem',
    },
    body2: {
      color: palette.text.primary,
      fontSize: isMobile ? '0.9rem' : '0.9rem',
    },
    subtitle1: {
      color: palette.text.secondary,
      fontSize: isMobile ? '0.7rem' : '0.6rem',
    },
    subtitle2: {
      color: palette.text.secondary,
      fontSize: isMobile ? '0.7rem' : '0.7rem',
      lineHeight: '1.2rem',
    },
  }
}
