/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import { Middleware } from '@reduxjs/toolkit'
import { updateOngoingMessageStatusToSent } from '../../onGoingMessages/slice'
import { updateConversationLastMessage } from '../../chats/slice'
import assignSocketEventHandlers from './EventHandlers'
import { setCall } from '../../rtc/slice'
import { MSG_SENT, playSoundAlert } from '../../../utils/audio-utils'
import { enqueueSnackbar } from 'notistack'
import { WebRTCActions } from '../webrtc'

export enum SocketEmitEvents {
  connect = 'socket/connect',
  disconnect = 'socket/disconnect',
  message = 'socket/message',
  call = 'socket/call',
  rejectCall = 'socket/reject',
  acceptCall = 'socket/accept',
  signal = 'socket/signal',
  answer = 'socket/answer',
}

export const socketMiddleware =
  (io: Socket<DefaultEventsMap, DefaultEventsMap>): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { type, payload } = action

    switch (type) {
      case SocketEmitEvents.connect:
        assignSocketEventHandlers(io, dispatch, getState)
        break

      case SocketEmitEvents.message:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        io.emit('message', payload, (ack: any) => {
          if (
            ack.status != null &&
            ack.status === 'success' &&
            ack.data != null
          ) {
            dispatch(
              // create and use updateOngoingMessage reducer
              updateOngoingMessageStatusToSent({
                conversationId: ack.data.conversationId,
                message: ack.data.message,
                messageId: ack.data.messageId,
                senderId: ack.data.senderId,
                timeStamp: ack.data.timeStamp,
                status: 'sent',
                localMessageId: ack.data.localMessageId,
                file: ack.data.file,
              })
            )

            let lastMsgQuickViewContent = ack.data.message
            if (ack.data.message === '' && ack.data.file != null) {
              lastMsgQuickViewContent = '[attachment]'
            }

            dispatch(
              updateConversationLastMessage({
                conversationId: ack.data.conversationId,
                lastMessage: lastMsgQuickViewContent,
                lastMessageTime: ack.data.timeStamp,
                lastMessageSenderId: ack.data.senderId,
              })
            )
            playSoundAlert(MSG_SENT)
          }
        })
        break

      case SocketEmitEvents.call:
        io.emit('call', payload, (ack: any) => {
          console.log('call event acknowledged with status: ', ack?.status)
          if (ack?.status != null && ack?.status === 'failed') {
            dispatch(
              setCall({
                call: 'idle',
                userId: null,
              })
            )
            enqueueSnackbar(`Call failed: ${ack?.message}`, {
              variant: 'error',
              autoHideDuration: 3000,
            })
          }
        })
        break

      case SocketEmitEvents.rejectCall:
        io.emit('reject call', payload, (ack: any) => {
          console.log('call rejection event acknowledged!')
        })
        dispatch({ type: WebRTCActions.endCall })
        dispatch(
          setCall({
            call: 'idle',
            userId: null,
          })
        )
        break

      case SocketEmitEvents.acceptCall:
        dispatch(
          setCall({
            call: 'in-call',
            userId: payload.userToAnswer,
          })
        )

        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: 'user',
              echoCancellation: true,
              noiseSuppression: true,
            },
            audio: { echoCancellation: true, noiseSuppression: true },
          })
          .then((mediaStream) => {
            const video = document.getElementById(
              'you-video'
            ) as HTMLVideoElement | null

            if (video == null) return
            if ('srcObject' in video) {
              video.srcObject = mediaStream
            }
            video.play()
            dispatch({
              type: WebRTCActions.createOffer,
              payload: {
                stream: mediaStream,
                userIdToConnect: payload?.userToAnswer,
              },
            })
          })
          .catch()
        break

      case SocketEmitEvents.signal:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        io.emit('signal', payload, (ack: any) => {})
        break

      case SocketEmitEvents.answer:
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        io.emit('answer', payload, (ack: any) => {})
        break

      case SocketEmitEvents.disconnect:
        io.disconnect()
        break

      default:
        break
    }

    return next(action)
  }
