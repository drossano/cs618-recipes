import {
  getRecipeById,
  listAllRecipes,
  listRecipesByAuthor,
} from '../services/recipes.js'

export const querySchema = `#graphql
type Query {
  test: String
  recipes: [Recipe!]!
  recipesByAuthor(username: String!): [Recipe!]!
  recipesById(id: ID!): Recipe
}`

export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello world from GraphQL!'
    },
    recipes: async () => {
      return await listAllRecipes()
    },
    recipesByAuthor: async (parent, { username }) => {
      return await listRecipesByAuthor(username)
    },
    recipesById: async (parent, { id }) => {
      return await getRecipeById(id)
    },
  },
}
