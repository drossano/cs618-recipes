import { getUserInfoById } from '../services/users.js'

export const recipeSchema = `#graphql
type Recipe{
  id: ID!
  name: String!
  author: User
  steps: String
  ingredients: String
  image: String
  likes: Int
  createdAt: Float
  updatedAt: Float
}`

export const recipeResolver = {
  Recipe: {
    author: async (recipe) => {
      return await getUserInfoById(recipe.author)
    },
  },
}
