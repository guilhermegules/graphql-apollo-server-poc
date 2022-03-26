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

export const userResolvers = {
  query: {
    users: () => users,
    firstUser: () => users[0]
  }
}