import { PaletteOptions } from '@mui/material'
import {
  action,
  highlight,
  background,
  error,
  primary,
  secondary,
  success,
  text,
  warning,
  sidebarColor,
  sheet,
} from './colors'
import { DisplayMode } from './types'

declare module '@mui/material/styles' {
  interface Palette {
    focus: {
      main: string
      light: string
      dark: string
    }
    highlight: {
      main: string
      light: string
      dark: string
    }
    sidebar: {
      main: string
      light: string
      dark: string
    }
    sheet: {
      main: string
      light: string
      dark: string
    }
  }
  interface PaletteOptions {
    focus: {
      main: string
      light: string
      dark: string
    }
    highlight: {
      main: string
      light: string
      dark: string
    }
    sidebar: {
      main: string
      light: string
      dark: string
    }
    sheet: {
      main: string
      light: string
      dark: string
    }
  }
}

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
    error: {
      main: mode === 'light' ? error.light : error.dark,
      light: error.light,
      dark: error.dark,
    },
    warning: {
      main: mode === 'light' ? warning.light : warning.dark,
      light: warning.light,
      dark: warning.dark,
    },
    success: {
      main: mode === 'light' ? success.light : success.dark,
      light: success.light,
      dark: success.dark,
    },
    // sync text color values with home.html's styles
    text: {
      primary: mode === 'light' ? text.primary.light : text.primary.dark,
      secondary: mode === 'light' ? text.secondary.light : text.secondary.dark,
    },
    // Background colors must be reflected in home.html styles
    background: {
      default:
        mode === 'light' ? background.default.light : background.default.dark,
      paper: mode === 'light' ? background.paper.light : background.paper.dark,
    },
    action: {
      active: action.active,
      hover: mode === 'light' ? action.hover.light : action.hover.dark,
    },
    focus: {
      main: mode === 'light' ? primary.light : primary.dark,
      light: primary.light,
      dark: primary.dark,
    },
    highlight: {
      main: mode === 'light' ? highlight.light : highlight.dark,
      light: highlight.light,
      dark: highlight.dark,
    },
    sidebar: {
      main: mode === 'light' ? sidebarColor.light : sidebarColor.dark,
      light: sidebarColor.light,
      dark: sidebarColor.dark,
    },
    sheet: {
      main: mode === 'light' ? sheet.light : sheet.dark,
      light: sheet.light,
      dark: sheet.dark,
    },
  }
}
