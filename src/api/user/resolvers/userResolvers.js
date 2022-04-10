export const userResolvers = {
  query: {
    users: (root, args, context, info) => context.dataSources.usersAPI.getUsers(),
  }
}