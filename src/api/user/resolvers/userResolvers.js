import { GraphQLScalarType } from 'graphql'

export const userResolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'date string of date and hour in format ISO-8601',
    serialize: (value) => value.toISOString(),
    parseValue: (value) => new Date(value),
    parseLiteral: (ast) => new Date(ast.value)
  }),
  query: {
    users: (root, args, context, info) => context.dataSources.usersAPI.getUsers(),
    user: (root, { id }, context, info) => context.dataSources.usersAPI.getUserById(id),
  },
  mutation: {
    addUser: (root, { user }, context, info) => context.dataSources.usersAPI.addUser(user),
    updateUser: (root, args, context, info) => context.dataSources.usersAPI.updateUser(args),
    deleteUser: (root, { id }, context, info) => context.dataSources.usersAPI.deleteUser(id)
  }
}