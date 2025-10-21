import { querySchema, queryResolver } from './query.js'
import { recipeSchema, recipeResolver } from './recipe.js'
import { userSchema, userResolver } from './user.js'
import { likeSchema, likeResolver } from './like.js'

export const typeDefs = [querySchema, recipeSchema, userSchema, likeSchema]
export const resolvers = [
  queryResolver,
  recipeResolver,
  userResolver,
  likeResolver,
]
