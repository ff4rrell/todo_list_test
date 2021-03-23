class Todo {
  constructor(
    title,
    todoId,
    userId,
    isDone = false
  ) {
    this.title = title;
    this.todoId = todoId;
    this.isDone = isDone;
    this.userId = userId
  }
}

module.exports = Todo;
