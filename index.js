import { ApolloServer } from 'apollo-server';

import { userSchema } from './src/api/user/schema/userSchema.js';
import { userResolvers } from './src/api/user/resolvers/userResolvers.js';
import { UsersAPI } from './src/api/user/datasource/userDataSource.js';

const typeDefs = [userSchema];

const resolvers = {
  Query: {
    ...userResolvers.query
  }
};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  dataSources: () => ({
    usersAPI: new UsersAPI()
  })
});

server.listen().then(({url}) => {
  console.log(`🚀 Server ready at ${url}`)
})
