import {Todo} from "./Todo";

export const TodoList = ({todoList, onRemove, onChange, sort, setSort}) => {
  const dir = sort.dir === 'asc' ? '^' : '¥';
  const changeSort = (field) => () => {
    const newDir = sort.field !== field ? 'asc' : sort.dir === 'asc' ? 'desc' : 'asc';
    setSort({field: field, dir: newDir})
  }
  return <table width={'600px'}>
    <tr>
      <th onClick={changeSort('todoId')}>
      todoId {sort.field === 'todoId' ? dir : ''}
      </th>
      <th onClick={changeSort('title')}>
        title {sort.field === 'title' ? dir : ''}
      </th>
      <th onClick={changeSort('isDone')}>
        is done {sort.field === 'isDone' ? dir : ''}
      </th>
      <th>
        actions
      </th>
    </tr>
    {todoList.map(it => 
      <>
      <Todo key={it.todoId} todo={it}
            onRemove={onRemove}
            onChange={onChange}/>
      </>
    )}
  </table>
}