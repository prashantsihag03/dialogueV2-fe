import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { DecoratorFn } from '@storybook/react'
import { useEffect } from 'react'
import getDesignTokens from '../Theme'
import { background } from '../Theme/colors'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../store'
import { apiSlice } from '../store/api/slice'

export const updateBgByTheme = (displayMode: 'light' | 'dark') => {
  const bodyEle = document.getElementsByTagName('body')[0]
  if (bodyEle) {
    bodyEle.style.backgroundColor =
      displayMode === 'light'
        ? background.default.light
        : background.default.dark
  }
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

export const baseCustomDecorator: DecoratorFn = (Story, context) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    updateBgByTheme(context.globals.theme)
  }, [context.globals.theme])
  return (
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider
          theme={createTheme(getDesignTokens(context.globals.theme))}
        >
          <Story />
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  )
}
