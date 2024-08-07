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
import { getActiveSideBar } from '../../store/sidebar/selector'
import { setActiveConversation } from '../../store/chats/slice'
import { getOngoingMessagesByConversationId } from '../../store/onGoingMessages/selector'

const GuidedTour: React.FC = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()

  const appGuideTour = useAppSelector(getRunGuidedTour)
  const openCreateConvoDialog = useAppSelector(getOpenCreateConvoDialog)
  const isProfileEditEnabled = useAppSelector(isEditingMyProfile)
  const activeConversation = useAppSelector(getActiveConversation)
  const activeProfile = useAppSelector(getActiveProfileUser)
  const activeSideBar = useAppSelector(getActiveSideBar)
  const createConvoEnabled = useAppSelector(isCreateConvoEnabled)
  const ongoingMessage = useAppSelector(
    getOngoingMessagesByConversationId(activeConversation?.conversationId ?? '')
  )
  const firstUserSearchResultMounted = useAppSelector(
    isFirstUserSearchResultMounted
  )
  const createConvoDialogRendered = useAppSelector(
    getCreateConvoDialogTransitionEnded
  )

  const [joyRideSteps] = useState<Step[]>(TourSteps)
  const [tourStep, setTourStep] = useState<number>(0)
  const [helpers, setHelpers] = useState<Joyride.StoreHelpers | null>(null)

  const userActionBasedNextHandler = useCallback(
    (target: string, when: boolean, beforeNextAction?: () => void) => {
      console.log('Called userActionBasedNextHandler with condition: ', when)
      const index = joyRideSteps.findIndex((step) => step.target === target)
      if (index === -1) return

      if (when && tourStep === index) {
        console.log(
          'Going to next for target ',
          target,
          ' with condition when as :',
          when
        )
        if (beforeNextAction) beforeNextAction()
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
    userActionBasedNextHandler(
      '.create-convo-btn',
      !openCreateConvoDialog,
      () => {
        // remove active conversation so when user clicks on first conversation it changes state
        // since moving to next step is based on state change of activeconversation
        if (activeConversation != null)
          dispatch(setActiveConversation(undefined))
      }
    )
  }, [openCreateConvoDialog])

  useEffect(() => {
    if (activeSideBar === 'setting')
      userActionBasedNextHandler(
        '.settings-joyride',
        activeSideBar === 'setting'
      )
  }, [activeSideBar])

  useEffect(() => {
    if (
      ongoingMessage != null &&
      ongoingMessage.length > 0 &&
      ongoingMessage[0].status === 'sent'
    ) {
      console.log('Set timeout initiated')
      setTimeout(function () {
        console.log('Timeout time spanned')
        userActionBasedNextHandler(
          '.message-input-box',
          ongoingMessage != null &&
            ongoingMessage.length > 0 &&
            ongoingMessage[ongoingMessage.length - 1].status === 'sent'
        )
      }, 1000)
    }
  }, [ongoingMessage])

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
          if (status === STATUS.FINISHED) {
            dispatch(setShowGuidedTourFinishedDialog(true))
          }
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
