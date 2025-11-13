import jwt from 'jsonwebtoken'
import { getUserInfoById } from './services/users.js'

export function handleSocket(io) {
  io.use((socket, next) => {
    if (!socket.handshake.auth?.token) {
      return next(new Error('Auth failed: no token proveded'))
    }
    jwt.verify(
      socket.handshake.auth.token,
      process.env.JWT_SECRET,
      async (err, decodedToken) => {
        if (err) {
          return next(new Error('Auth failed: invalid token'))
        }
        socket.auth = decodedToken
        socket.user = await getUserInfoById(socket.auth.sub)
        return next()
      },
    )
  })
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id)
    })
    socket.on('recipe.add', (recipe) => {
      console.log(`${recipe}`)
      socket.broadcast.emit('recipe.add', {
        username: socket.user.username,
        recipe,
      })
    })
    socket.on('user.info', async (socketId, callback) => {
      const sockets = await io.in(socketId).fetchSockets()
      if (sockets.length === 0) return callback(null)
      const userInfo = {
        socketId,
        user: socket.user,
      }
      return callback(userInfo)
    })
  })
}
