import { io, Socket } from 'socket.io-client'

let socket: Socket

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  console.log('Dev Env detected. Connecting socket to localhost:3000')
  socket = io('http://localhost:3000/')
} else {
  socket = io()
}

export default socket
