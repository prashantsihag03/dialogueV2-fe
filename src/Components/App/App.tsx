import {
  Box,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material'
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
import {
  setGreet,
  setRunGuidedTour,
  setShowGuidedTourFinishedDialog,
} from '../../store/config/slice'
import GuidedTour from '../GuidedTour/GuidedTour'
import {
  useGetUserSettingsQuery,
  useUpdateUserSettingMutation,
} from '../../store/api/slice'
import isTrue from '../../utils/common-utils'
import { setSideBarPreference } from '../../store/sidebar/slice'

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
  const [updateUserSetting] = useUpdateUserSettingMutation()
  const appGuideTour = useAppSelector(getRunGuidedTour)

  useEffect(() => {
    if (isMobile == true) dispatch(setSideBarPreference('mobile'))
    else dispatch(setSideBarPreference('web'))
  }, [isMobile])

  useEffect(() => {
    dispatch(getUserConversations())
    dispatch(getMyProfile())
    dispatch({ type: 'socket/connect' })
    return () => {
      dispatch({ type: 'socket/disconnect' })
    }
  }, [dispatch])

  useEffect(() => {
    setInitialGuideAttempted((prevValue) => {
      if (prevValue === true) return false
      return true
    })
  }, [data])

  if (isFetching) {
    return
  }

  if (isError || data == null) {
    return
  }

  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>
        <Box sx={containerStyles}>
          <Dialog
            open={
              isTrue(data.greetMeEverytime) && !initialGuideAttempted && greet
            }
            keepMounted={false}
            TransitionComponent={Slide}
            transitionDuration={200}
            fullWidth
            sx={{
              '& .MuiPaper-root': {
                backgroundColor: 'background.paper',
              },
            }}
            onClose={(e, reason) => {
              if (reason === 'backdropClick') return
              dispatch(setGreet(false))
            }}
          >
            <DialogTitle sx={{ color: 'secondary.main' }}>
              <b>Greetings,</b>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body2" component="p">
                  Thank you for taking the time to explore Dialogue.
                </Typography>
                <br />
                <Typography variant="body2" component="p">
                  Dialogue is more than just a chat application; it&apos;s a
                  personal project crafted with the intention to upskill and
                  showcase my proficiency in a variety of tools and
                  technologies.
                </Typography>
                {!isMobile ? (
                  <>
                    <br />
                    <Typography variant="body2" component="p">
                      Would you be interested in a brief tour of the
                      application? It&apos;s an opportunity to witness firsthand
                      the dedication and innovation behind this self-upskilling
                      endeavor.
                    </Typography>
                  </>
                ) : null}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {!isMobile ? (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    dispatch(setGreet(false))
                    dispatch(setRunGuidedTour(true))
                  }}
                >
                  Start Tour
                </Button>
              ) : null}
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  dispatch(setGreet(false))
                  dispatch(setRunGuidedTour(false))
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          {showTourFinishedDialog ? (
            <Dialog
              open={showTourFinishedDialog}
              keepMounted={false}
              TransitionComponent={Slide}
              transitionDuration={200}
              fullWidth
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: 'background.paper',
                },
              }}
            >
              <DialogTitle sx={{ color: 'secondary.main' }}>
                <b>Tour Finished</b>
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  <Typography variant="body1" component="p">
                    Thank you for finishing the tour. I hope you liked it.
                  </Typography>
                  <br />
                  <Typography variant="body1" component="p">
                    Please feel free to leave any feedback as a message to my
                    userid: <i>prashant</i>
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ padding: '0.2em 1em' }}
                  onClick={() => {
                    dispatch(setShowGuidedTourFinishedDialog(false))
                    updateUserSetting({
                      key: 'greetMeEverytime',
                      value: false,
                    })
                  }}
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
          <Box>{appGuideTour ? <GuidedTour /> : null}</Box>
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
