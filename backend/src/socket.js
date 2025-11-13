export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id)
    })
    socket.on('recipe.add', (recipe) => {
      console.log(`${recipe}`)
      socket.broadcast.emit('recipe.add', {
        username: socket.id,
        recipe,
      })
    })
    socket.on('user.info', async (socketId, callback) => {
      const sockets = await io.in(socketId).fetchSockets()
      if (sockets.length === 0) return callback(null)
      const userInfo = {
        socketId,
      }
      return callback(userInfo)
    })
  })
}
