import { Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import { setCall } from '../rtc/slice'

declare const window: any

interface PeerConnection {
  conn: SimplePeer.Instance
  userIdToConnect: string
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
      case 'rtc/receiverPeer':
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
              'remoteVideo'
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
            type: 'rtc/endCall',
          })
        })

        peerConnections[payload.userIdToConnect].conn.on(
          'signal',
          (data: any) => {
            console.log('Sending answer signal')
            dispatch({
              type: 'socket/answer',
              payload: {
                userToAnswer:
                  peerConnections[payload.userIdToConnect].userIdToConnect,
                answer: data,
              },
            })
          }
        )

        break

      case 'rtc/createOffer':
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
            type: 'socket/signal',
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
            'remoteVideo'
          ) as HTMLVideoElement | null

          if (video == null) return
          if ('srcObject' in video) {
            video.srcObject = stream
          }

          video.play()
        })
        newConn1.conn.on('end', () => {
          dispatch({
            type: 'rtc/endCall',
          })
        })

        peerConnections[newConn1.userIdToConnect] = newConn1
        break

      case 'rtc/receivedOffer':
        if (peerConnections[payload.userIdToConnect] == null) {
          console.log('Received offer from unexpected user')
          break
        }
        console.log('Received Offer signal data')
        peerConnections[payload.userIdToConnect].conn.signal(payload.signalData)
        break

      case 'rtc/receivedAnswer':
        const userIdOfAnswer = payload.userId
        if (peerConnections[userIdOfAnswer] == null) {
          console.log('Received answer signal data from an unexpected user')
          break
        }
        console.log('Received answer signal data')
        peerConnections[userIdOfAnswer].conn.signal(payload.signalData)
        break

      case 'rtc/endCall':
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

        const video = document.getElementById(
          'remoteVideo'
        ) as HTMLVideoElement | null

        if (video == null) return
        if (
          'srcObject' in video &&
          video.srcObject != null &&
          video.srcObject instanceof MediaStream
        ) {
          video.pause()
          video.srcObject.getTracks().forEach((track) => track.stop())
          video.srcObject = null
        }
        const localVideo = document.getElementById(
          'localVideo'
        ) as HTMLVideoElement | null

        if (localVideo == null) return
        if (
          'srcObject' in localVideo &&
          localVideo.srcObject != null &&
          localVideo.srcObject instanceof MediaStream
        ) {
          localVideo.pause()
          localVideo.srcObject.getTracks().forEach((track) => track.stop())
          localVideo.srcObject = null
        }

        break

      case 'rtc/mute':
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
