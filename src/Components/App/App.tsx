import { Box, CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { useEffect, useState } from 'react'
import useCreateTheme from '../../hooks/useDisplayMode'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Header from '../Header'
import MainSection from '../MainSection'
import { containerStyles } from './styles'
import { getUserConversations } from '../../store/chats/thunk'
import { getMyProfile } from '../../store/profile/thunk'

import {
  getGreet,
  getRunGuidedTour,
  showGuidedTourFinishedDialog,
} from '../../store/config/selector'
import GuidedTour from '../GuidedTour/GuidedTour'
import { useGetUserSettingsQuery } from '../../store/api/slice'
import isTrue from '../../utils/common-utils'
import { setSideBarPreference } from '../../store/sidebar/slice'
import StatusIndicator from '../Commons/StatusIndicator'
import { removeReceivingCall } from '../../store/rtc/slice'
import CallPopUp from '../CallPopUp/CallPopUp'
import TourBeginDialog from '../GuidedTour/TourBeginDialog'
import TourCompleteDialog from '../GuidedTour/TourCompleteDialog'
import { SocketEmitEvents } from '../../store/middlewares/Socket/socket'

export const App = () => {
  const dispatch = useAppDispatch()
  const isMobile = useMediaQuery('(max-width:600px)')
  const [initialGuideAttempted, setInitialGuideAttempted] =
    useState<boolean>(false)
  const { isFetching, isError, data } =
    useGetUserSettingsQuery('greetMeEverytime')
  const { theme, displayMode, toggleDisplayMode } = useCreateTheme()
  const greet = useAppSelector(getGreet)
  const showTourFinishedDialog = useAppSelector(showGuidedTourFinishedDialog)
  const appGuideTour = useAppSelector(getRunGuidedTour)

  useEffect(() => {
    if (isMobile == true) dispatch(setSideBarPreference('mobile'))
    else dispatch(setSideBarPreference('web'))
  }, [dispatch, isMobile])

  useEffect(() => {
    dispatch(getUserConversations())
    dispatch(getMyProfile())
    dispatch({ type: SocketEmitEvents.connect })
    return () => {
      dispatch({ type: SocketEmitEvents.disconnect })
    }
  }, [dispatch])

  useEffect(() => {
    setInitialGuideAttempted((prevValue) => {
      if (prevValue === true) return false
      return true
    })
  }, [data])

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          onClose={(e, reason, key) => {
            if (
              reason === 'timeout' &&
              key?.toString().includes('receivingCall')
            ) {
              if (key == null) return
              dispatch(removeReceivingCall(key))
              dispatch({
                type: SocketEmitEvents.rejectCall,
                payload: {
                  userToAnswer: key.toString().split('receivingCall-')[1],
                },
              })
            }
          }}
          Components={{
            callPopUp: CallPopUp,
          }}
          maxSnack={10}
        />
        <Box
          sx={{
            ...containerStyles,
            backgroundColor:
              isMobile === true ? 'background.paper' : 'background.default',
          }}
        >
          {isFetching ? (
            <StatusIndicator status="loading" message="configuring" />
          ) : null}
          {isError || data == null ? (
            <StatusIndicator
              status="error"
              message="Failed to fetch configuration."
            />
          ) : null}
          {data != null ? (
            <TourBeginDialog
              open={
                isTrue(data.greetMeEverytime) && !initialGuideAttempted && greet
              }
            />
          ) : null}
          {showTourFinishedDialog ? (
            <TourCompleteDialog open={showTourFinishedDialog} />
          ) : null}
          <Box>{appGuideTour ? <GuidedTour /> : null}</Box>
          {isMobile == false ? (
            <Header
              displayMode={displayMode}
              toggleDisplayMode={toggleDisplayMode}
            />
          ) : null}
          <MainSection />
        </Box>
      </ThemeProvider>
    </CssBaseline>
  )
}
