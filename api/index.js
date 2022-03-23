import { ApolloServer, gql } from 'apollo-server';

const users = [
  {
    name: 'Guilherme',
    active: true,
  },
  {
    name: 'Mary',
    active: false,
  },
];

const typeDefs = gql`
  type User {
    name: String!
    active: Boolean!
    email: String
  }
`;

const server = new ApolloServer({ typeDefs, resolvers });
