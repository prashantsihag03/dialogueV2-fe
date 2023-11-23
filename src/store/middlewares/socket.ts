import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'
import { connected, disconnected } from '../connection/slice'
import { Middleware } from '@reduxjs/toolkit'
import {
  addOngoingMessage,
  updateOngoingMessageStatusToSent,
} from '../onGoingMessages/slice'
import { RootState } from '..'
import {
  setShowLatestMsgInView,
  updateConversationLastMessage,
} from '../chats/slice'

export const socketMiddleware =
  (io: Socket<DefaultEventsMap, DefaultEventsMap>): Middleware =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    const { type, payload } = action

    switch (type) {
      case 'socket/connect':
        io.connect()
        io.on('connect', () => {
          dispatch(connected())
        })
        io.on('disconnect', () => {
          dispatch(disconnected())
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
            state.chats.activeConversation?.conversationId ===
              data.conversationId
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
              })
            )
            dispatch(
              updateConversationLastMessage({
                conversationId: ack.data.conversationId,
                lastMessage: ack.data.message,
                lastMessageTime: ack.data.timeStamp,
                lastMessageSenderId: ack.data.senderId,
              })
            )
          }
        })
        console.log('Message event emitted with following payload', payload)
        break

      case 'socket/disconnect':
        io.disconnect()
        break

      default:
        break
    }

    return next(action)
  }
