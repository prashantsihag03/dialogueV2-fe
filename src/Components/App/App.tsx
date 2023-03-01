import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import useDisplayMode from '../../hooks/useDisplayMode'
import Header from '../Header'
import Main from '../Main'
import { containerStyles } from './styles'

export const App = () => {
  const { theme, displayMode, toggleDisplayMode } = useDisplayMode()

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Box sx={containerStyles}>
          <Header
            displayMode={displayMode}
            toggleDisplayMode={toggleDisplayMode}
          />
          <Main />
        </Box>
      </ThemeProvider>
    </CssBaseline>
  )
}
