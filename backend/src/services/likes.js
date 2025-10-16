import { Like } from '../db/models/like.js'

export async function likeRecipe(recipeId, userId) {
  const like = new Like(recipeId, userId)
  return await like.save()
}
export async function unlikeRecipe(recipeId, userId) {
  return await Like.deleteOne({ recipe: recipeId, user: userId })
}
