import { Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import { setCall } from '../rtc/slice'

declare const window: any

interface PeerConnection {
  conn: SimplePeer.Instance
  userIdToConnect: string
}

export const webrtcMiddleware =
  (peerConnections: PeerConnection[]): Middleware =>
  ({ dispatch }) =>
  (next) =>
  (action) => {
    const { type, payload } = action

    switch (type) {
      case 'rtc/createOffer':
        const newConn1: PeerConnection = {
          userIdToConnect: payload.userIdToConnect,
          conn: new window.SimplePeer({
            initiator: true,
            stream: payload.stream,
          }) as SimplePeer.Instance,
        }
        newConn1.conn.on('signal', (data: any) => {
          dispatch({
            type: 'socket/initiateCall',
            payload: {
              userToCall: newConn1.userIdToConnect,
              offer: data,
            },
          })
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
          dispatch(
            setCall({
              call: 'idle',
              userId: null,
            })
          )
        })

        peerConnections.push(newConn1)
        break

      case 'rtc/receivedOffer':
        const newConn2: PeerConnection = {
          userIdToConnect: payload.userIdToConnect,
          conn: new window.SimplePeer({
            stream: payload.stream,
          }) as SimplePeer.Instance,
        }
        newConn2.conn.signal(payload.signalData)
        newConn2.conn.on('data', (data: string) => {
          console.log(newConn2.userIdToConnect, 'Message: ' + data)
          newConn2.conn.send(`Hey ${newConn2.userIdToConnect}!`)
        })
        newConn2.conn.on('end', () => {
          dispatch(
            setCall({
              call: 'idle',
              userId: null,
            })
          )
        })

        newConn2.conn.on('stream', (stream: MediaProvider | null) => {
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

        newConn2.conn.on('signal', (data: any) => {
          dispatch({
            type: 'socket/answerCall',
            payload: {
              userToAnswer: newConn2.userIdToConnect,
              answer: data,
            },
          })
        })
        peerConnections.push(newConn2)
        break

      case 'rtc/receivedAnswer':
        const userIdOfAnswer = payload.userId
        const index = peerConnections.findIndex(
          (conn) => conn.userIdToConnect === userIdOfAnswer
        )

        if (index === -1) {
          console.log('Received answer signal data from an unexpected user')
          break
        }
        peerConnections[index].conn.signal(payload.signalData)
        break

      default:
        break
    }

    return next(action)
  }
