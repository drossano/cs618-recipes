import { likeRecipe, getTotalLikes } from '../services/likes.js'
import { getRecipeById } from '../services/recipes.js'

import { requireAuth } from '../middleware/jwt.js'

export function likeRoutes(app) {
  app.post('/api/v1/likes', requireAuth, async (req, res) => {
    try {
      const { recipeId, session } = req.body
      const recipe = await getRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      const like = await likeRecipe(req.auth.sub, { recipeId, session })
      return res.json({ like: like.session })
    } catch (err) {
      console.error('error liking recipe', err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/likes/totalLikes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      const stats = await getTotalLikes(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting likes', err)
      return res.status(500).end()
    }
  })
}
