import { PaletteOptions } from '@mui/material'
import { action, background, primary, secondary, text } from './colors'
import { DisplayMode } from './types'

export const getPaletteTheme = (mode: DisplayMode): PaletteOptions => {
  return {
    mode: mode,
    primary: {
      main: mode === 'light' ? primary.light : primary.dark,
      light: primary.light,
      dark: primary.dark,
    },
    secondary: {
      main: mode === 'light' ? secondary.light : secondary.dark,
      light: secondary.light,
      dark: secondary.dark,
    },
    text: {
      primary: mode === 'light' ? text.primary.light : text.primary.dark,
      secondary: mode === 'light' ? text.secondary.light : text.secondary.dark,
    },
    // Background colors must be reflected in index.html styles
    background: {
      default:
        mode === 'light' ? background.default.light : background.default.dark,
      paper: mode === 'light' ? background.paper.light : background.paper.dark,
    },
    action: {
      active: action.active,
      hover: action.hover,
    },
  }
}
