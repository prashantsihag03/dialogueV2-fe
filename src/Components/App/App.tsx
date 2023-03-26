import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import useDisplayMode from '../../hooks/useDisplayMode'
import socket from '../../socket'
import { connected, disconnected } from '../../store/connection/slice'
import { useAppDispatch } from '../../store/hooks'
import Header from '../Header'
import MainSection from '../MainSection'
import { containerStyles } from './styles'

export const App = () => {
  const { theme, displayMode, toggleDisplayMode } = useDisplayMode()
  const dispatch = useAppDispatch()

  useEffect(() => {
    function onConnect() {
      dispatch(connected())
    }

    function onDisconnect() {
      dispatch(disconnected())
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  })

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Box sx={containerStyles}>
          <Header
            displayMode={displayMode}
            toggleDisplayMode={toggleDisplayMode}
          />
          <MainSection />
        </Box>
      </ThemeProvider>
    </CssBaseline>
  )
}
