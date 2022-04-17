import { gql } from 'apollo-server';

export const userSchema = gql`
  scalar DateTime

  type User {
    name: String!
    active: Boolean!
    email: String
    role: Role!
    createdAt: DateTime
  }

  type Role {
    id: ID!
    type: RoleEnum!
  }

  enum RoleEnum {
    STUDENT
    TEACHER
    MANAGER
  }

  input UserInput {
    name: String
    active: Boolean
    email: String
    role: Int
    createdAt: DateTime
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(user: UserInput): UserMutationResponse!
    updateUser(id: ID!, user: UserInput): UserMutationResponse!
    deleteUser(id: ID!): DeleteUserResponse!
  }

  interface APIResponse {
    code: Int!
    message: String!
  }

  type DeleteUserResponse implements APIResponse {
    code: Int!
    message: String!
  }

  type UserMutationResponse implements APIResponse {
    code: Int!
    message: String!
    user: User!
  }
`;
