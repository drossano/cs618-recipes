import {
  getRecipeById,
  listAllRecipes,
  listRecipesByAuthor,
} from '../services/recipes.js'

export const querySchema = `#graphql
input RecipesOptions {
  sortBy: String
  sortOrder: String
}
type Query {
  test: String
  recipes(options: RecipesOptions): [Recipe!]!
  recipesByAuthor(username: String!,options: RecipesOptions ): [Recipe!]!
  recipesById(id: ID!, options: RecipesOptions): Recipe
}`

export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello world from GraphQL!'
    },
    recipes: async (parent, { options }) => {
      return await listAllRecipes(options)
    },
    recipesByAuthor: async (parent, { username, options }) => {
      return await listRecipesByAuthor(username, options)
    },
    recipesById: async (parent, { id, options }) => {
      return await getRecipeById(id, options)
    },
  },
}
