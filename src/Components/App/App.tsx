import { Box, CssBaseline, Snackbar, ThemeProvider } from '@mui/material'
import { useEffect, useState } from 'react'
import useDisplayMode from '../../hooks/useDisplayMode'
import socket from '../../socket'
import { connected, disconnected } from '../../store/connection/slice'
import { useAppDispatch } from '../../store/hooks'
import Header from '../Header'
import MainSection from '../MainSection'
import { containerStyles } from './styles'

export const App = () => {
  const { theme, displayMode, toggleDisplayMode } = useDisplayMode()
  const [open, setOpen] = useState<boolean>(false)
  const [snackBarMsg, setSnackBarMsg] = useState<string>('')
  const dispatch = useAppDispatch()

  useEffect(() => {
    function onConnect() {
      setOpen(true)
      setSnackBarMsg('Connected. Receiving real time updates.')
      dispatch(connected())
    }

    function onDisconnect() {
      setOpen(true)
      setSnackBarMsg("Disconnected. Real time updates won't be available.")
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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={() => {
            setOpen(false)
          }}
          message={snackBarMsg}
          key={'top' + 'center'}
        />
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
