import { gql } from 'apollo-server';

export const userSchema = gql`
  type User {
    name: String!
    active: Boolean!
    email: String
  }

  type Query {
    users: [User]
    firstUser: User
  }
`;
