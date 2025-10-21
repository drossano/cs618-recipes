import { getUserInfoById } from '../services/users.js'
import { getLikesByRecipeId } from '../services/likes.js'

export const recipeSchema = `#graphql
type Recipe{
  id: ID!
  name: String!
  author: User
  steps: String
  ingredients: String
  image: String
  likes: [Like!]!
  createdAt: Float
  updatedAt: Float
}`

export const recipeResolver = {
  Recipe: {
    author: async (recipe) => {
      return await getUserInfoById(recipe.author)
    },
    likes: async (recipe) => {
      return await getLikesByRecipeId(recipe.id)
    },
  },
}
