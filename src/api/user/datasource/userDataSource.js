import { RESTDataSource } from 'apollo-datasource-rest'

export class UsersAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3000'
  }

  async getUsers() {
    const users = await this.get('/users');

    return users.map(async user => ({
      ...user,
      role: await this.get(`/roles/${user.role}`)
    }))
  }

  async getUserById(id) {
    return this.get(`/users/${id}`)
      .then(async user => ({...user, role: await this.get(`/roles/${user.role}`)}));
  }
}