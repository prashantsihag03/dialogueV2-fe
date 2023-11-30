import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from 'react-joyride'
import { useTheme } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getActiveConversation,
  getCreateConvoDialogTransitionEnded,
  getOpenCreateConvoDialog,
  isCreateConvoEnabled,
  isFirstUserSearchResultMounted,
} from '../../store/chats/selector'
import {
  getActiveProfileUser,
  isEditingMyProfile,
} from '../../store/profile/selector'
import TourSteps from './TourSteps'
import {
  setRunGuidedTour,
  setShowGuidedTourFinishedDialog,
} from '../../store/config/slice'
import { getRunGuidedTour } from '../../store/config/selector'

const GuidedTour: React.FC = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const appGuideTour = useAppSelector(getRunGuidedTour)
  const openCreateConvoDialog = useAppSelector(getOpenCreateConvoDialog)
  const isProfileEditEnabled = useAppSelector(isEditingMyProfile)
  const firstUserSearchResultMounted = useAppSelector(
    isFirstUserSearchResultMounted
  )
  const activeConversation = useAppSelector(getActiveConversation)
  const activeProfile = useAppSelector(getActiveProfileUser)
  const [joyRideSteps] = useState<Step[]>(TourSteps)
  const createConvoEnabled = useAppSelector(isCreateConvoEnabled)
  const [tourStep, setTourStep] = useState<number>(0)
  const [helpers, setHelpers] = useState<Joyride.StoreHelpers | null>(null)
  const createConvoDialogRendered = useAppSelector(
    getCreateConvoDialogTransitionEnded
  )

  const userActionBasedNextHandler = useCallback(
    (target: string, when: boolean) => {
      const index = joyRideSteps.findIndex((step) => step.target === target)
      if (index === -1) return

      if (when && tourStep === index) {
        console.log(
          'Going to next for target ',
          target,
          ' with condition when as :',
          when
        )
        helpers?.next()
      }
    },
    [joyRideSteps, tourStep, helpers]
  )

  useEffect(() => {
    userActionBasedNextHandler(
      '.logged-in-profile-avatar',
      Boolean(activeProfile?.id && activeProfile?.isLoggedInUser)
    )
  }, [activeProfile?.id])

  useEffect(() => {
    userActionBasedNextHandler('.profile-edit', isProfileEditEnabled)
  }, [isProfileEditEnabled])

  useEffect(() => {
    console.log('.profile-save isProfileEditEnabled', isProfileEditEnabled)
    userActionBasedNextHandler('.profile-save', !isProfileEditEnabled)
  }, [isProfileEditEnabled])

  useEffect(() => {
    userActionBasedNextHandler(
      '.create-conversation-icon',
      createConvoDialogRendered
    )
  }, [createConvoDialogRendered])

  useEffect(() => {
    userActionBasedNextHandler(
      '.create-convo-search-userid',
      firstUserSearchResultMounted
    )
  }, [firstUserSearchResultMounted])

  useEffect(() => {
    userActionBasedNextHandler('.first-user-search-result', createConvoEnabled)
  }, [createConvoEnabled])

  useEffect(() => {
    userActionBasedNextHandler(
      '.first-conversation-quickview-joyride',
      Boolean(activeConversation?.conversationId)
    )
  }, [activeConversation?.conversationId])

  useEffect(() => {
    userActionBasedNextHandler(
      '.conversation-box-conversation-profile-box',
      Boolean(activeProfile?.id)
    )
  }, [activeProfile?.id])

  useEffect(() => {
    userActionBasedNextHandler('.create-convo-btn', !openCreateConvoDialog)
  }, [openCreateConvoDialog])

  return (
    <Joyride
      spotlightClicks={false}
      disableOverlay={false}
      callback={(data: CallBackProps) => {
        const { action, status, type } = data
        if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
          setTourStep(tourStep + (action === ACTIONS.PREV ? -1 : 1))
        } else if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
          dispatch(setRunGuidedTour(false))
          if (status === STATUS.FINISHED)
            dispatch(setShowGuidedTourFinishedDialog(true))
        }
      }}
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
  )
}

export default GuidedTour
