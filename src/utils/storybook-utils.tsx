import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { useEffect } from 'react'
import getDesignTokens from '../Theme'
import { background } from '../Theme/colors'

export const updateBgByTheme = (displayMode: 'light' | 'dark') => {
  const bodyEle = document.getElementsByTagName('body')[0]
  if (bodyEle) {
    bodyEle.style.backgroundColor =
      displayMode === 'light'
        ? background.default.light
        : background.default.dark
  }
}

export const baseCustomDecorator: DecoratorFn = (Story, context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    updateBgByTheme(context.globals.theme)
  }, [context.globals.theme])
  return (
    <CssBaseline>
      <ThemeProvider
        theme={createTheme(getDesignTokens(context.globals.theme))}
      >
        <Story />
      </ThemeProvider>
    </CssBaseline>
  )
}
