import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import useDisplayMode from '../../hooks/useDisplayMode'
import { useAppDispatch } from '../../store/hooks'
import Header from '../Header'
import MainSection from '../MainSection'
import { containerStyles } from './styles'
import { getUserConversations } from '../../store/chats/thunk'
import { getMyProfile } from '../../store/profile/thunk'

export const App = () => {
  const { theme, displayMode, toggleDisplayMode } = useDisplayMode()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserConversations())
    dispatch(getMyProfile())
    dispatch({ type: 'socket/connect' })
    return () => {
      dispatch({ type: 'socket/disconnect' })
    }
  }, [dispatch])

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
