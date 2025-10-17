import { Like } from '../db/models/like.js'
import { v4 as uuidv4 } from 'uuid'
export async function likeRecipe(
  userId,
  { recipeId, session = uuidv4(), date = Date.now() },
) {
  const like = new Like({ recipe: recipeId, user: userId, session, date })
  return await like.save()
}

export async function getLikeById(likeId) {
  return await Like.findById(likeId)
}

export async function unlikeRecipe(userId, recipeId) {
  return await Like.deleteOne({ recipe: recipeId, user: userId })
}
