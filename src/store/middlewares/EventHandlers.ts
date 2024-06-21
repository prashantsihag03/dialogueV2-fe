import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import { connected, disconnected } from '../connection/slice'
import { RootState } from '..'
import { addOngoingMessage } from '../onGoingMessages/slice'
import {
  setShowLatestMsgInView,
  updateConversationLastMessage,
} from '../chats/slice'
import { setCall, setReceivingCall } from '../rtc/slice'
import { MSG_RECEIVED, playSoundAlert } from '../../utils/audio-utils'
import { enqueueSnackbar } from 'notistack'

export const config = {
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
}

const assignSocketEventHandlers = (
  io: Socket<DefaultEventsMap, DefaultEventsMap>,
  dispatch: Dispatch<AnyAction>,
  getState: () => any
) => {
  io.connect()
  io.on('connect', () => {
    dispatch(connected())
  })

  io.on('disconnect', () => {
    dispatch(disconnected())
  })

  io.on('offer signal', async (data: any) => {
    if (data.offer == null || data.callerUserId == null) {
      console.log('Offer received with invalid data ', data)
      return
    }
    dispatch({
      type: 'rtc/receivedOffer',
      payload: {
        userIdToConnect: data.callerUserId,
        signalData: data.offer,
      },
    })
    dispatch(setCall({ call: 'receiving', userId: data.callerUserId }))
  })

  io.on('call rejected', async (data: any) => {
    if (data.from == null) {
      console.log('call rejected event received with invalid data ', data)
      return
    }

    if (getState().rtc.userId === data.from) {
      dispatch(setCall({ call: 'idle', userId: null }))
      dispatch({ type: 'rtc/endCall' })
      enqueueSnackbar(`Call declined by ${data.from}`, {
        variant: 'default',
        autoHideDuration: 5000,
      })
    }
  })

  io.on('receiving call', async (data: any) => {
    console.log('receiving receiving call event')

    if (data.callerUserId == null) {
      console.log('Invalid data!', data)
      return
    }
    dispatch(setReceivingCall(data.callerUserId))
  })

  io.on('answer signal', async (data: any) => {
    if (data.answer == null || data.from == null) {
      console.log('Answer received with invalid data ', data)
      return
    }
    dispatch({
      type: 'rtc/receivedAnswer',
      payload: { userId: data.from, signalData: data.answer },
    })
  })

  io.on('message', (data) => {
    const state: RootState = getState()
    if (data.conversationId == null) {
      console.error('ConversationId missing in received message event')
      return
    }

    // if conversationId has onGoingMessages data
    if (state.onGoingMessages[data.conversationId] != null) {
      dispatch(
        addOngoingMessage({
          conversationId: data.conversationId,
          message: data.message,
          messageId: data.messageId,
          senderId: data.senderId,
          timeStamp: data.timeStamp,
          status: 'sent',
          localMessageId: data.localMessageId,
          file: data.file,
        })
      )
    }

    dispatch(
      updateConversationLastMessage({
        conversationId: data.conversationId,
        lastMessage:
          data.message == null || (data.message.length < 1 && data.file != null)
            ? '[attachment]'
            : data.message,
        lastMessageTime: data.timeStamp,
        lastMessageSenderId: data.senderId,
      })
    )

    if (
      state.chats.activeConversation?.conversationId != null &&
      state.chats.activeConversation?.conversationId === data.conversationId
    ) {
      // // play new message music
      dispatch(setShowLatestMsgInView(true))
    } else {
      // Show notification since the convo is not active
      // But should we show notification ? coz the conversation's last msg will get updated,
      // and technically should come up top
    }
    playSoundAlert(MSG_RECEIVED)
  })
}

export default assignSocketEventHandlers
