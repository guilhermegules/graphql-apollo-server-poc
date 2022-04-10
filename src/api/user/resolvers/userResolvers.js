export const userResolvers = {
  query: {
    users: (root, args, context, info) => context.dataSources.usersAPI.getUsers(),
    user: (root, { id }, context, info) => context.dataSources.usersAPI.getUserById(id),
  }
}