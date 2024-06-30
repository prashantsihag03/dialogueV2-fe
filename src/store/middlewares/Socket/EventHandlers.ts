import { AnyAction, Dispatch } from '@reduxjs/toolkit'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import { connected, disconnected } from '../../connection/slice'
import { RootState } from '../..'
import { addOngoingMessage } from '../../onGoingMessages/slice'
import {
  setShowLatestMsgInView,
  updateConversationLastMessage,
} from '../../chats/slice'
import { removeReceivingCall, setCall, setReceivingCall } from '../../rtc/slice'
import { MSG_RECEIVED, playSoundAlert } from '../../../utils/audio-utils'
import { enqueueSnackbar } from 'notistack'
import { WebRTCActions } from '../webrtc'

export const config = {
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
}

export enum SocketReceivingEvents {
  connect = 'connect',
  disconnect = 'disconnect',
  offerSignal = 'offer signal',
  callRejected = 'call rejected',
  receivingCall = 'receiving call',
  answerSignal = 'answer signal',
  message = 'message',
  callCancelled = 'call cancelled',
}

const assignSocketEventHandlers = (
  io: Socket<DefaultEventsMap, DefaultEventsMap>,
  dispatch: Dispatch<AnyAction>,
  getState: () => RootState
) => {
  io.connect()
  io.on(SocketReceivingEvents.connect, () => {
    dispatch(connected())
  })

  io.on(SocketReceivingEvents.disconnect, () => {
    dispatch(disconnected())
  })

  io.on(SocketReceivingEvents.callCancelled, async (data: any) => {
    if (getState().rtc.receivingCalls[data.from] == null) {
      console.log('Receiving call cancel event from unexpected caller id')
      return
    }
    dispatch(removeReceivingCall(`receivingCall-${data.from}`))
  })

  io.on(SocketReceivingEvents.offerSignal, async (data: any) => {
    if (getState().rtc.call === 'idle') {
      console.log('Receiving offer from potentially exhausted call attempt')
      return
    }
    if (data.offer == null || data.callerUserId == null) {
      console.log('Offer received with invalid data ', data)
      return
    }
    dispatch({
      type: WebRTCActions.receivedOffer,
      payload: {
        userIdToConnect: data.callerUserId,
        signalData: data.offer,
      },
    })
    dispatch(setCall({ call: 'receiving', userId: data.callerUserId }))
  })

  io.on(SocketReceivingEvents.callRejected, async (data: any) => {
    if (data.from == null) {
      console.log('call rejected event received with invalid data ', data)
      return
    }

    if (getState().rtc.userId === data.from) {
      dispatch({ type: WebRTCActions.endCall })
      enqueueSnackbar(`Call declined by ${data.from}`, {
        variant: 'default',
        autoHideDuration: 3000,
      })
    }
  })

  io.on(SocketReceivingEvents.receivingCall, async (data: any, ack: any) => {
    ack()
    if (data.callerUserId == null) {
      console.log('Invalid data!', data)
      return
    }
    dispatch(setReceivingCall(data.callerUserId))
  })

  io.on(SocketReceivingEvents.answerSignal, async (data: any) => {
    if (data.answer == null || data.from == null) {
      console.log('Answer received with invalid data ', data)
      return
    }
    dispatch({
      type: WebRTCActions.receivedAnswer,
      payload: { userId: data.from, signalData: data.answer },
    })
  })

  io.on(SocketReceivingEvents.message, (data) => {
    if (data.conversationId == null) {
      console.error('ConversationId missing in received message event')
      return
    }

    const state: RootState = getState()
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
          type: data.type,
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
        // add lastMessageType here to display video call icon in there
      })
    )

    if (
      state.chats.activeConversation?.conversationId != null &&
      state.chats.activeConversation?.conversationId === data.conversationId
    ) {
      dispatch(setShowLatestMsgInView(true))
    }
    playSoundAlert(MSG_RECEIVED)
  })
}

export default assignSocketEventHandlers
