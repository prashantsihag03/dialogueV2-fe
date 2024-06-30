import { Middleware } from '@reduxjs/toolkit'
import SimplePeer from 'simple-peer'
import {
  setCall,
  setMuteAudio,
  setMuteVideo,
  setSuppressNoise,
} from '../rtc/slice'
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
  muteAudio = 'rtc/muteAudio',
  muteVideo = 'rtc/muteVideo',
  suppressNoise = 'rtc/suppressNoise',
  changeCamera = 'rtc/changeCamera',
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

      case WebRTCActions.muteAudio:
        const { callId: callIdToMuteAudio, mute: muteAudio } = payload
        if (peerConnections[callIdToMuteAudio] == null) {
          console.log(
            'Call Id provided to mute is not available in connections!'
          )
          break
        }

        peerConnections[callIdToMuteAudio].conn.streams.forEach((stream) => {
          stream.getAudioTracks().forEach((track) => {
            if (track.kind === 'audio') {
              track.enabled = !muteAudio
            }
          })
        })
        dispatch(setMuteAudio(muteAudio))
        break

      case WebRTCActions.muteVideo:
        const { callId: callIdToMuteVideo, mute: muteVideo } = payload
        if (peerConnections[callIdToMuteVideo] == null) {
          console.log(
            'Call Id provided to mute is not available in connections!'
          )
          break
        }

        peerConnections[callIdToMuteVideo].conn.streams.forEach((stream) => {
          stream.getVideoTracks().forEach((track) => {
            if (track.kind === 'video') {
              track.enabled = !muteVideo
            }
          })
        })
        dispatch(setMuteVideo(muteVideo))
        break

      case WebRTCActions.suppressNoise:
        const { callId: callIdToSuppressNoise, suppress } = payload
        if (peerConnections[callIdToSuppressNoise] == null) {
          console.log(
            'Call Id provided to mute is not available in connections!'
          )
          break
        }

        peerConnections[callIdToSuppressNoise].conn.streams.forEach(
          (stream) => {
            stream.getVideoTracks().forEach((track) => {
              if (track.kind === 'video') {
                track.applyConstraints({ noiseSuppression: suppress })
              }
            })
            stream.getAudioTracks().forEach((track) => {
              if (track.kind === 'video') {
                track.applyConstraints({ noiseSuppression: suppress })
              }
            })
          }
        )
        dispatch(setSuppressNoise(suppress))
        break

      case WebRTCActions.changeCamera:
        const { callId: callIdToChangeCamera } = payload
        if (peerConnections[callIdToChangeCamera] == null) {
          console.log(
            'Call Id provided to change camera is not available in connections!'
          )
          break
        }

        peerConnections[callIdToChangeCamera].conn.streams.forEach((stream) => {
          stream.getVideoTracks().forEach((track) => {
            if (track.kind === 'video') {
              if (track.getConstraints().facingMode === 'user') {
                track.applyConstraints({ facingMode: 'environment' })
              } else {
                track.applyConstraints({
                  facingMode: 'user',
                })
              }
            }
          })
        })
        break

      default:
        break
    }

    return next(action)
  }
