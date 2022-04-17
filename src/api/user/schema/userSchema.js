import { gql } from 'apollo-server';

export const userSchema = gql`
  type User {
    name: String!
    active: Boolean!
    email: String
    role: Role!
  }

  type Role {
    id: ID!
    type: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, active: Boolean!, email: String, role: Int!): User!
    updateUser(id: ID!, name: String!, active: Boolean!, email: String!, role: Int!): User!
    deleteUser(id: Int!): Int!
  }
`;
