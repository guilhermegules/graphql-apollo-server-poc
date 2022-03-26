import { ApolloServer } from 'apollo-server';

import { userSchema } from './src/api/user/schema/userSchema.js';
import { userResolvers } from './src/api/user/resolvers/userResolvers.js';

const typeDefs = [userSchema];

const resolvers = {
  Query: {
    ...userResolvers.query
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`)
})
