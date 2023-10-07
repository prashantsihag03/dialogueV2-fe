import { ThemeOptions } from '@mui/material'
import { getComponentsTheme } from './components'
import { getPaletteTheme } from './palette'
import { getTypographyTheme } from './typography'

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => {
  return {
    palette: getPaletteTheme(mode),
    shape: {
      borderRadius: 7,
    },
    typography: (palette) => getTypographyTheme(palette),
    components: getComponentsTheme(mode),
  }
}

export default getDesignTokens
