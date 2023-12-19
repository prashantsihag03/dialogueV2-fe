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
import { setCall, setCallAnswer } from '../rtc/slice'

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

  io.on('incoming call', async (data: any) => {
    if (data.offer == null || data.callerUserId == null) {
      console.log('Offer received with invalid data ', data)
      return
    }
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((mediaStream) => {
        const video = document.getElementById(
          'localVideo'
        ) as HTMLVideoElement | null

        if (video == null) return
        if ('srcObject' in video) {
          video.srcObject = mediaStream
        }
        video.play()
        dispatch({
          type: 'rtc/receivedOffer',
          payload: {
            userIdToConnect: data.callerUserId,
            stream: mediaStream,
            signalData: data.offer,
          },
        })
        dispatch(setCall({ call: 'receiving', userId: data.callerUserId }))
      })
      .catch()
  })

  io.on('answering call', async (data: any) => {
    if (data.answer == null || data.from == null) {
      console.log('Answer received with invalid data ', data)
      return
    }
    dispatch({
      type: 'rtc/receivedAnswer',
      payload: { userId: data.from, signalData: data.answer },
    })
    dispatch(setCallAnswer(data.answer))
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
        })
      )
    }

    dispatch(
      updateConversationLastMessage({
        conversationId: data.conversationId,
        lastMessage: data.message,
        lastMessageTime: data.timeStamp,
        lastMessageSenderId: data.senderId,
      })
    )

    if (
      state.chats.activeConversation?.conversationId != null &&
      state.chats.activeConversation?.conversationId === data.conversationId
    ) {
      // // play new message music
      console.log('Play active convo new msg audio!')
      dispatch(setShowLatestMsgInView(true))
    } else {
      // Show notification since the convo is not active
      // But should we show notification ? coz the conversation's last msg will get updated,
      // and technically should come up top
    }
  })
}

export default assignSocketEventHandlers
