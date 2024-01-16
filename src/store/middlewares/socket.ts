/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import { Middleware } from '@reduxjs/toolkit'
import { updateOngoingMessageStatusToSent } from '../onGoingMessages/slice'
import { updateConversationLastMessage } from '../chats/slice'
import assignSocketEventHandlers from './EventHandlers'
import { setCall } from '../rtc/slice'

export const socketMiddleware =
  (io: Socket<DefaultEventsMap, DefaultEventsMap>): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { type, payload } = action

    switch (type) {
      case 'socket/connect':
        assignSocketEventHandlers(io, dispatch, getState)
        break

      case 'socket/message':
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
          }
        })
        break

      case 'socket/initiateCall':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        io.emit('initiateCall', payload, (ack: any) => {})
        dispatch(
          setCall({
            call: 'initiating',
            userId: payload.userToCall,
          })
        )
        break

      case 'socket/answerCall':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        io.emit('answerCall', payload, (ack: any) => {})
        break

      case 'socket/disconnect':
        io.disconnect()
        break

      default:
        break
    }

    return next(action)
  }
