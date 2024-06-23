import { Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import { setCall } from '../rtc/slice'
import { SocketEmitEvents } from './Socket/socket'

declare const window: any

interface PeerConnection {
  conn: SimplePeer.Instance
  userIdToConnect: string
}

export enum WebRTCActions {
  createReceiverPeer = 'rtc/receiverPeer',
  createOffer = 'rtc/createOffer',
  receivedOffer = 'rtc/receivedOffer',
  receivedAnswer = 'rtc/receivedAnswer',
  endCall = 'rtc/endCall',
  mute = 'rtc/mute',
}

export const webrtcMiddleware =
  (peerConnections: {
    [userIdToConnect: string]: PeerConnection
  }): Middleware =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const { type, payload } = action

    switch (type) {
      case WebRTCActions.createReceiverPeer:
        peerConnections[payload.userIdToConnect] = {
          userIdToConnect: payload.userIdToConnect,
          conn: new window.SimplePeer({
            stream: payload.stream,
          }) as SimplePeer.Instance,
        }

        peerConnections[payload.userIdToConnect].conn.on('connect', () => {
          peerConnections[payload.userIdToConnect].conn.send(
            `hey ${payload.userIdToConnect}`
          )
        })

        peerConnections[payload.userIdToConnect].conn.on(
          'data',
          (data: string) => {
            console.log(payload.userIdToConnect, 'Message: ' + data)
          }
        )

        peerConnections[payload.userIdToConnect].conn.on(
          'stream',
          (stream: MediaProvider | null) => {
            // got remote video stream, now let's show it in a video tag
            const video = document.getElementById(
              `${payload.userIdToConnect}-video`
            ) as HTMLVideoElement | null

            if (video == null) return
            if ('srcObject' in video) {
              video.srcObject = stream
            }

            video.play()
          }
        )

        peerConnections[payload.userIdToConnect].conn.on('end', () => {
          dispatch({
            type: WebRTCActions.endCall,
          })
        })

        peerConnections[payload.userIdToConnect].conn.on(
          'signal',
          (data: any) => {
            console.log('Sending answer signal')
            dispatch({
              type: SocketEmitEvents.answer,
              payload: {
                userToAnswer:
                  peerConnections[payload.userIdToConnect].userIdToConnect,
                answer: data,
              },
            })
          }
        )

        break

      case WebRTCActions.createOffer:
        const newConn1: PeerConnection = {
          userIdToConnect: payload.userIdToConnect,
          conn: new window.SimplePeer({
            initiator: true,
            stream: payload.stream,
          }) as SimplePeer.Instance,
        }
        newConn1.conn.on('signal', (data: any) => {
          console.log('Sending offer signal data')
          dispatch({
            type: SocketEmitEvents.signal,
            payload: {
              userToCall: newConn1.userIdToConnect,
              offer: data,
            },
          })
          peerConnections[newConn1.userIdToConnect] = newConn1
        })
        newConn1.conn.on('connect', () => {
          newConn1.conn.send(`hey ${newConn1.userIdToConnect}`)
        })
        newConn1.conn.on('data', (data: string) => {
          console.log(newConn1.userIdToConnect, 'Message: ' + data)
        })
        newConn1.conn.on('stream', (stream: MediaProvider | null) => {
          // got remote video stream, now let's show it in a video tag
          const video = document.getElementById(
            `${newConn1.userIdToConnect}-video`
          ) as HTMLVideoElement | null

          if (video == null) return
          if ('srcObject' in video) {
            video.srcObject = stream
          }

          video.play()
        })
        newConn1.conn.on('end', () => {
          dispatch({
            type: WebRTCActions.endCall,
          })
        })

        peerConnections[newConn1.userIdToConnect] = newConn1
        break

      case WebRTCActions.receivedOffer:
        if (peerConnections[payload.userIdToConnect] == null) {
          console.log('Received offer from unexpected user')
          break
        }
        console.log('Received Offer signal data')
        peerConnections[payload.userIdToConnect].conn.signal(payload.signalData)
        break

      case WebRTCActions.receivedAnswer:
        const userIdOfAnswer = payload.userId
        if (peerConnections[userIdOfAnswer] == null) {
          console.log('Received answer signal data from an unexpected user')
          break
        }
        console.log('Received answer signal data')
        peerConnections[userIdOfAnswer].conn.signal(payload.signalData)
        break

      case WebRTCActions.endCall:
        dispatch(
          setCall({
            call: 'idle',
            userId: null,
          })
        )

        Object.keys(peerConnections).forEach((peerConn) => {
          peerConnections[peerConn].conn.end()
        })
        peerConnections = {}

        const videoElements = document.getElementsByClassName(`callVideo`)

        for (let i = 0; i < videoElements.length; i++) {
          const videoEle = videoElements[i]
          if (
            'srcObject' in videoEle &&
            videoEle.srcObject != null &&
            videoEle.srcObject instanceof MediaStream &&
            videoEle instanceof HTMLVideoElement
          ) {
            videoEle.pause()
            videoEle.srcObject.getTracks().forEach((track) => track.stop())
            videoEle.srcObject = null
          }
        }
        break

      case WebRTCActions.mute:
        const callIdToMute = payload.callId
        if (peerConnections[callIdToMute] == null) {
          console.log(
            'Call Id provided to mute is not available in connections!'
          )
          break
        }

        // peerConnections[callIdToMute].conn.streams
        break

      default:
        break
    }

    return next(action)
  }
