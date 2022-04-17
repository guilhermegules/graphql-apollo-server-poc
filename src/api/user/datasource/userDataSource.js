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

  async addUser(user) {
    const users = await this.get('/users');
  
    user.id = users.length + 1;

    const role = await this.get(`/roles/${user.role}`)

    await this.post(`/users`, { ...user, role: role.id });

    return {
      ...user,
      role
    }
  }

  async updateUser(newData) {
    const role = await this.get(`/roles/${newData.role}`);

    await this.put(`/users/${newData.id}`, { ...newData, role: role.id })

    return {
      ...newData,
      role
    }
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`);

    return id;
  }
}