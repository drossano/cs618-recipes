import { Like } from '../db/models/like.js'
import { v4 as uuidv4 } from 'uuid'
import { updateRecipeLikes } from './recipes.js'

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

export async function getLikeByRecipeAndUserIds(userId, recipeId) {
  return await Like.findOne({ recipe: recipeId, user: userId })
}

export async function unlikeRecipe(userId, recipeId) {
  return await Like.deleteOne({ recipe: recipeId, user: userId })
}

export async function getTotalLikes(recipeId) {
  const totalLikes = await Like.countDocuments({ recipe: recipeId })
  await updateRecipeLikes(recipeId, { likes: totalLikes })
  return {
    likes: totalLikes,
  }
}

export async function checkIfLiked(userId, recipeId) {
  if (getLikeByRecipeAndUserIds(userId, recipeId));
}
