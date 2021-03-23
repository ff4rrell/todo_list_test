const Todo = require('./todo')
const {Filters} = require("./constants");

const filters = {
  [Filters.ALL]: () => true,
  [Filters.ACTIVE]: it => !it.isDone,
  [Filters.COMPLETED]: it => it.isDone,
}
const sortings = {
  todoId: (a, b) => a.todoId - b.todoId,
  title: (a, b) => a.title.localeCompare(b.title),
  isDone: (a, b) => (a.isDone === b.isDone) ? 0 : a.isDone ? -1 : 1
}

class TodoManager {
  constructor() {
    this.list = [];
    this.idCounter = 0;
  }

  createTodo(title) {
    return new Todo(title, this.idCounter++)
  }

  createTodoWithUserId(title, user){
    return new Todo(title,this.idCounter++, user.userId)
  }

  add(todo) {
    this.list.push(todo)
  }

  addIfNotPresentedByTitle(todo) {
    const similarTodos = this.findByTitle(todo.title)
    if (similarTodos.length === 0) {
      this.add(todo)
    }
  }

  findByTitle(title, todoList) {
    return (todoList || this.getAll())
      .filter(it => it.title === title)
  }

  searchByTitle(title, todoList) {
    return (todoList || this.getAll())
      .filter(it => it.title.includes(title))
  }

  getAll() {
    return this.list
  }

  getFiltered(filter, todoList) {
    return (todoList || this.getAll())
      .filter(filters[filter] || filters[Filters.ALL])
  }

  getByFilterAndSearchText(filter = Filters.ALL, searchText = '') {
    return this.getAll()
      .filter(filters[filter] || filters[Filters.ALL])
      .filter(it => it.title.includes(searchText))
  }

  getByFilterAndSearchTextAndSort(filter = Filters.ALL,
                                  searchText = '',
                                  sortField = 'todoId',
                                  sortDir = 'asc',
                                  page = 1,
                                  limit = 10) {
    const list = this.getByFilterAndSearchText(filter, searchText)
      .sort(sortings[sortField])
    const filteredAndSorted = sortDir === 'asc' ? list : list.reverse()
    const start = (page - 1) * limit
    const end = page * limit
    const paged = filteredAndSorted.slice(start, end);
    return {list: paged, total: list.length}
  }
  

  getById(todoId) {
    return this.list.find(it => it.todoId === todoId)
  }

  changeTodo(todoId, changeSet) {
    const todo = this.getById(todoId)
    if (todo) {
      Object.keys(todo)
        .forEach(field => {
          if (field in changeSet) {
            todo[field] = changeSet[field];
          }
        })
    }
  }

  remove(todoId) {
    this.list = this.list.filter(it => it.todoId !== todoId)
  }
}

module.exports = TodoManager;
