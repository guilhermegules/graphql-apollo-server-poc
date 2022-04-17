export const userResolvers = {
  query: {
    users: (root, args, context, info) => context.dataSources.usersAPI.getUsers(),
    user: (root, { id }, context, info) => context.dataSources.usersAPI.getUserById(id),
  },
  mutation: {
    addUser: (root, user, context, info) => context.dataSources.usersAPI.addUser(user),
    updateUser: (root, user, context, info) => context.dataSources.usersAPI.updateUser(user),
    deleteUser: (root, { id }, context, info) => context.dataSources.usersAPI.deleteUser(id)
  }
}