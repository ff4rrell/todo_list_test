const User = require("./user");

class UserManager {
  constructor() {
    this.list = [];
    this.idCounter = 0;
  }

  createUser(name, password) {
    return new User(name, password, this.idCounter++);
  }

  addUser(user) {
    this.list.push(user);
  }

  addIfNotPresentedByName(user) {
    const similarUsers = this.findByName(user.name);
    if (similarUsers.length === 0) {
      this.addUser(user);
    }
  }

  findByName(name, userList) {
    return (userList || this.getAll()).filter((it) => it.name === name);
  }
  findUserByName(name) {
    return this.getAll().find((it) => it.name === name);
  }

  findByToken(token, userList) {
    return (userList || this.getAll()).find((it) => it.token === token) //.pop();
  }

  searchByName(name, userList) {
    return (userList || this.getAll()).filter((it) => it.name.includes(name));
  }

  getAll() {
    return this.list;
  }

  getById(id) {
    return this.list.find((it) => it.id === id);
  }

  changeUserFindById(id, changeSet) {
    const user = this.getById(id);
    if (user) {
      Object.keys(user).forEach((field) => {
        if (field in changeSet) {
          user[field] = changeSet[field];
        }
      });
    }
  }
  changeUserFindByName(name, changeSet) {
    const user = this.getById(name);
    if (user) {
      Object.keys(user).forEach((field) => {
        if (field in changeSet) {
          user[field] = changeSet[field];
        }
      });
    }
  }

  setTokenForUser(name, password) {
    const user = this.findUserByName(name);
    if (user && user.password === password) {
      user.token = Math.random().toString();
      return user;
    }

  }
  deleteTokenFromUser(token) {
    const user = this.list.find((it) => it.token === token);
    console.log(user, "user");
    if (user) {
      delete user.token;
    }
  }

  remove(id) {
    this.list = this.list.filter((it) => it.id !== id);
  }
}

module.exports = UserManager;
