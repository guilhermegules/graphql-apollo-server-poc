import { RESTDataSource } from 'apollo-datasource-rest'

export class UsersAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3000'
    this.response = {
      code: 200, 
      message: "Operation made with success!"
    }
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
      ...this.response,
      user: {
        ...user,
        role
      }
    }
  }

  async updateUser(newData) {
    const role = await this.get(`/roles/${newData.user.role}`);

    await this.put(`/users/${newData.id}`, { ...newData.user, role: role.id })

    return {
      ...this.response,
      user: {
        ...newData.user,
        role
      }
    }
  }

  async deleteUser(id) {
    await this.delete(`/users/${id}`);

    return {
      ...this.response
    };
  }
}