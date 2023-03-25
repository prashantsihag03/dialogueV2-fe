import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import useDisplayMode from '../../hooks/useDisplayMode'
import socket from '../../socket'
import Header from '../Header'
import MainSection from '../MainSection'
import { containerStyles } from './styles'

export const App = () => {
  const { theme, displayMode, toggleDisplayMode } = useDisplayMode()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected] = useState(socket.connected)

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
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
