import requester from "../utils/requester";
import Pathes from "../pathes";

export function Todo({todo, onRemove, onChange}) {
  const removeTodo = async () => {
    await requester.delete(Pathes.todoId(todo.todoId))
    onRemove && onRemove()
  }
  const changeStatus = async () => {
    await requester.post(Pathes.todoId(todo.todoId), {
      isDone: !todo.isDone
    })
    onChange && onChange()
  }
  return <tr>
    <td>{todo.todoId}</td>
    <td>{todo.title}</td>
    <td>{todo.isDone ? 'done' : 'not done'}</td>
    <td>
      <button onClick={removeTodo}>delete todo</button>
      <button onClick={changeStatus}>change status</button>
    </td>
  </tr>
}