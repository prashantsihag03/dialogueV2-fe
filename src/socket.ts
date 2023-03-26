import { io, Socket } from 'socket.io-client'

let socket: Socket

if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
  socket = io('http://localhost:3000/')
} else {
  socket = io()
}

export default socket
