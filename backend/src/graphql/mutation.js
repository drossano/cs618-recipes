import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createRecipe } from '../services/recipes.js'
import { likeRecipe } from '../services/likes.js'

export const mutationSchema = `#graphql
type Mutation {
  signupUser(username: String!, password: String!): User
  loginUser(username: String!, password: String!): String
  createRecipe(name: String!, steps: String, ingredients: String, image: String): Recipe
  likeRecipe(recipe: ID!,): Like
  unlikeRecipe(recipe: ID!): String
}`

export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createRecipe: async (
      parent,
      { name, ingredients, steps, image },
      { auth },
    ) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      console.log(name)
      return await createRecipe(auth.sub, { name, ingredients, steps, image })
    },
    likeRecipe: async (parent, { recipe }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      console.log('gql user', auth.sub)
      console.log('gql recipe', recipe)
      return await likeRecipe(auth.sub, { recipeId: recipe })
    },
  },
}
