import { getUserInfoById } from '../services/users.js'
export const likeSchema = `#graphql
type Like{
  user: User
  recipe:Recipe

}`

export const likeResolver = {
  Like: {
    user: async (like) => {
      return await getUserInfoById(like.user)
    },
  },
}
