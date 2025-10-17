import { likeRecipe, unlikeRecipe } from '../services/likes.js'

import { requireAuth } from '../middleware/jwt.js'

export function likesRoutes(app) {
  app.post('/api/v1/like', requireAuth, async (req, res) => {
    try {
      const like = await likeRecipe(req.params.id, req.auth.sub)
      return res.json(like)
    } catch (err) {
      console.err('error liking recipe', err)
      return res.status(500).end()
    }
  })
  app.delete('/api/v1/unlike', requireAuth, async (req, res) => {
    try {
      const { deletedLikeCount } = await unlikeRecipe(
        req.params.id,
        req.auth.sub,
      )
      if (deletedLikeCount == 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('error deleting recipe', err)
      return res.status(500).end()
    }
  })
}
