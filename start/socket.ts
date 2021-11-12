import Ws from 'App/Services/Ws'
import {Socket} from 'socket.io';
Ws.boot()

/**
 * Listen for incoming socket connections
 */
const connections = new Set()
Ws.io.on('connection', (socket) => {
  socket.on('connectToRoom', (args) => {
    connections.add(socket)
    Ws.io.emit('clients:online', { online: connections.size })
  })
  socket.on('message', (message) => {
    console.log(message)
    connections.forEach((client: Socket) => {
      client.emit('messages:new', { id: socket.id, message })
    })
  })
  socket.on('getMyId', (callback) => {
    callback({ id: socket.id })
  })
  socket.on('user:save', (args) => {
    console.log(args)
  })
  socket.on('disconnect', (s) => {
    console.log('Usuario desconectado', s)
    connections.delete(socket)
    Ws.io.emit('clients:online', { online: connections.size })
  })
})
