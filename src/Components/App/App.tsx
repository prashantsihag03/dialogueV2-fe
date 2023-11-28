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
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import useDisplayMode from '../../hooks/useDisplayMode'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Header from '../Header'
import MainSection from '../MainSection'
import { containerStyles } from './styles'
import { getUserConversations } from '../../store/chats/thunk'
import { getMyProfile } from '../../store/profile/thunk'
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from 'react-joyride'
import { getGreet, getRunGuidedTour } from '../../store/config/selector'
import { setGreet, setRunGuidedTour } from '../../store/config/slice'
import {
  getActiveConversation,
  getCreateConvoDialogTransitionEnded,
  getOpenCreateConvoDialog,
  isCreateConvoEnabled,
  isFirstUserSearchResultMounted,
} from '../../store/chats/selector'
import AppGuidedTourSteps from './AppGuidedTourSteps'
import { getActiveProfileUser } from '../../store/profile/selector'

export const App = () => {
  const dispatch = useAppDispatch()
  const { theme, displayMode, toggleDisplayMode } = useDisplayMode()
  const greet = useAppSelector(getGreet)
  const appGuideTour = useAppSelector(getRunGuidedTour)
  const openCreateConvoDialog = useAppSelector(getOpenCreateConvoDialog)
  const firstUserSearchResultMounted = useAppSelector(
    isFirstUserSearchResultMounted
  )
  const activeConversation = useAppSelector(getActiveConversation)
  const activeProfile = useAppSelector(getActiveProfileUser)
  const [joyRideSteps] = useState<Step[]>(AppGuidedTourSteps)
  const createConvoEnabled = useAppSelector(isCreateConvoEnabled)
  const [tourStep, setTourStep] = useState<number>(0)
  const [helpers, setHelpers] = useState<Joyride.StoreHelpers | null>(null)
  const createConvoDialogRendered = useAppSelector(
    getCreateConvoDialogTransitionEnded
  )

  // create convo dialog
  useEffect(() => {
    if (createConvoDialogRendered) {
      const index = joyRideSteps.findIndex(
        (step) => step.target === '.create-conversation-icon'
      )
      if (index === -1) return
      if (tourStep === index) {
        helpers?.next()
      }
    }
  }, [createConvoDialogRendered])

  // show result in create convo dialog
  useEffect(() => {
    if (firstUserSearchResultMounted) {
      const index = joyRideSteps.findIndex(
        (step) => step.target === '.create-convo-search-userid'
      )
      if (index === -1) return
      if (tourStep === index) {
        helpers?.next()
      }
    }
  }, [firstUserSearchResultMounted])

  // clicking onc reate btn in create convo dialog
  useEffect(() => {
    if (createConvoEnabled) {
      const index = joyRideSteps.findIndex(
        (step) => step.target === '.first-user-search-result'
      )
      if (index === -1) return
      if (tourStep === index) {
        helpers?.next()
      }
    }
  }, [createConvoEnabled])

  // clicking onc reate btn in create convo dialog
  useEffect(() => {
    if (activeConversation?.conversationId) {
      const index = joyRideSteps.findIndex(
        (step) => step.target === '.first-conversation-quickview-joyride'
      )
      if (index === -1) return
      if (tourStep === index) {
        helpers?.next()
      }
    }
  }, [activeConversation?.conversationId])

  // clicking profile
  useEffect(() => {
    if (activeProfile?.id) {
      const index = joyRideSteps.findIndex(
        (step) => step.target === '.conversation-box-conversation-profile-box'
      )
      if (index === -1) return
      if (tourStep === index) {
        helpers?.next()
      }
    }
  }, [activeProfile?.id])

  // dialog hidden
  useEffect(() => {
    const index = joyRideSteps.findIndex(
      (step) => step.target === '.create-convo-btn'
    )
    if (index === -1) return

    if (!openCreateConvoDialog && tourStep === index) {
      // dialog was closed on create-convo-btn tour step
      if (tourStep === index) {
        helpers?.next()
      }
    }
  }, [openCreateConvoDialog])

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
          <Dialog
            open={greet}
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
              <b>Welcome to Dialogue</b>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Typography variant="body1" component="p">
                  Welcome and Thank you for checking out this project. I hope
                  you like it.
                </Typography>
                <br />
                <Typography variant="body1" component="p">
                  Dialogue is a chat application built with a motivation to
                  learn and get hands on experience with some of the
                  technologies used and is serving as a play ground for me to
                  learn more tools and technologies as I progress further in my
                  skills.
                </Typography>
                <br />
                <Typography variant="body1" component="p">
                  Would you like to have a brief tour of the application ?
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="secondary"
                sx={{ padding: '0.2em 1em' }}
                onClick={() => {
                  dispatch(setGreet(false))
                  dispatch(setRunGuidedTour(true))
                }}
              >
                Start Tour
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{ padding: '0.2em 1em', fontSize: '0.9rem' }}
                onClick={() => {
                  dispatch(setGreet(false))
                  dispatch(setRunGuidedTour(false))
                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Box>
            {appGuideTour ? (
              <>
                <Joyride
                  spotlightClicks={false}
                  disableOverlay={false}
                  callback={(data: CallBackProps) => {
                    const { action, status, type } = data
                    if (
                      type === EVENTS.STEP_AFTER ||
                      type === EVENTS.TARGET_NOT_FOUND
                    ) {
                      setTourStep(tourStep + (action === ACTIONS.PREV ? -1 : 1))
                    } else if (
                      status === STATUS.FINISHED ||
                      status === STATUS.SKIPPED
                    ) {
                      dispatch(setRunGuidedTour(false))
                      window.alert(
                        'App Tour finished. Feel free to explore the application further by yourself.'
                      )
                    }
                  }}
                  debug={true}
                  run={appGuideTour}
                  continuous={true}
                  disableOverlayClose={true}
                  steps={joyRideSteps}
                  getHelpers={(helpers) => {
                    setHelpers(helpers)
                  }}
                  stepIndex={tourStep}
                  styles={{
                    options: {
                      arrowColor: theme.palette.secondary.light,
                      backgroundColor: theme.palette.secondary.light,
                      textColor: 'white',
                      width: 350,
                    },
                    buttonNext: {
                      backgroundColor: 'white',
                      color: theme.palette.secondary.light,
                    },
                    buttonBack: {
                      color: 'white',
                    },
                    buttonSkip: {
                      color: 'white',
                    },
                    tooltipContainer: {
                      padding: '0',
                      margin: '0',
                    },
                    tooltipContent: {
                      padding: '0',
                      paddingTop: '0.5rem',
                    },
                  }}
                  hideBackButton={false}
                  showSkipButton={true}
                  hideCloseButton={true}
                  showProgress={false}
                  disableCloseOnEsc={true}
                  disableScrollParentFix={true}
                  disableScrolling={true}
                />
              </>
            ) : null}
          </Box>
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
