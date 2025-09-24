import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(
  userId,
  { name, ingredients, steps, image },
) {
  const recipe = new Recipe({ name, author: userId, ingredients, steps, image })
  return await recipe.save()
}

export async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

export async function getRecipeById(RecipeId) {
  return await Recipe.findById(RecipeId)
}

export async function updateRecipe(
  userId,
  RecipeId,
  { name, ingredients, steps, image },
) {
  return await Recipe.findOneAndUpdate(
    { _id: RecipeId, author: userId },
    { $set: { name, ingredients, steps, image } },
    { new: true },
  )
}

export async function deleteRecipe(userId, RecipeId) {
  return await Recipe.deleteOne({ _id: RecipeId, author: userId })
}
