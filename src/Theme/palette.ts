import { PaletteOptions } from '@mui/material'
import { DisplayMode } from './types'

export const getPaletteTheme = (mode: DisplayMode): PaletteOptions => {
  return {
    mode: mode,
    primary: {
      main: mode === 'light' ? '#f9f9f9' : '#101010',
      light: '#f9f9f9',
      dark: '#101010',
    },
    secondary: {
      main: mode === 'light' ? '#2b6bff' : '#8dafff',
      light: '#2b6bff',
      dark: '#8dafff',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFF',
      secondary: mode === 'light' ? '#1a1a1a' : '#b5b5b5',
    },
    // Background colors must be reflected in index.html styles
    background: {
      default: mode === 'light' ? 'whitesmoke' : '#151515',
      paper: mode === 'light' ? 'white' : '#0b0b0b',
    },
    action: {
      active: '#FFF',
      hover: 'rgba(128, 128, 128, 0.2)',
    },
  }
}
