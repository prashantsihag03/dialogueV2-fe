import { createTheme, useMediaQuery } from '@mui/material'
import * as React from 'react'
import getDesignTokens from '../Theme'
import { DisplayMode } from '../Theme/types'

const useDisplayMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [displayMode, setDisplayMode] = React.useState<DisplayMode>(
    prefersDarkMode ? 'dark' : 'light'
  )

  const toggleDisplayMode = () => {
    if (displayMode === 'light') {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#000000')
      setDisplayMode('dark')
    } else {
      const metaThemeColor = document.querySelector('meta[name=theme-color]')
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#FFF')
      setDisplayMode('light')
    }
  }

  const theme = React.useMemo(
    () => createTheme(getDesignTokens(displayMode)),
    [displayMode]
  )

  return {
    theme,
    displayMode,
    toggleDisplayMode,
  }
}

export default useDisplayMode
