const stubber = (todoManager, quantity = 50) => {
  for (let i = 0; i < 50; i++){
    const todo = todoManager.createTodo(Math.random().toString())
    todoManager.add(todo)
  }
}

module.exports = stubber
