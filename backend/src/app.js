import express from 'express'
import { recipesRoutes } from './routes/recipes.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { likeRoutes } from './routes/likes.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs, resolvers } from './graphql/index.js'
import { optionalAuth } from './middleware/jwt.js'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from './socket.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
recipesRoutes(app)
userRoutes(app)
likeRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)

export { server as app }

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

apolloServer.start().then(() =>
  app.use(
    '/graphql',
    optionalAuth,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { auth: req.auth }
      },
    }),
  ),
)
