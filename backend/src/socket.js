import { getNewestRecipe } from './services/recipes.js'

export function handleSocket(io) {
  io.on('connection', (socket) => {
    console.log('user connected:', socket.id)
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id)
    })
    socket.on('recipe.add', async () => {
      const recipe = await getNewestRecipe()
      console.log(recipe)
      socket.broadcast.emit('recipe.add', recipe)
    })
  })
}
