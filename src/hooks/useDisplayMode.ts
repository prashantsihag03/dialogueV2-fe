import { createTheme, useMediaQuery } from '@mui/material'
import * as React from 'react'
import getDesignTokens from '../Theme'
import { DisplayMode } from '../Theme/types'

const useCreateTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const isMobile = useMediaQuery('(max-width:600px)')
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
    () => createTheme(getDesignTokens(displayMode, isMobile)),
    [displayMode, isMobile]
  )

  React.useEffect(() => {
    console.log('Updating meta theme color')
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme.palette.sidebar.main)
  }, [theme])

  return {
    theme,
    displayMode,
    toggleDisplayMode,
  }
}

export default useCreateTheme
