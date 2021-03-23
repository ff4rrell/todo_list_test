import React from "react";
import {CreateTodo} from "./CreateTodo";
import {Filter} from "../components/Filters";
import {Search} from "../components/Search";
import {TodoList} from "./TodoList";

const TodoManager = ({refreshTodoList, filter, setFilter, todoList, sort, setSort, pagesToRender, searchText, setSearchText, changePage, currentPage, maxPage, removeTokenAndLogOut, onAdd={onAdd}, userToken}) => {
  onAdd={onAdd}
  return (
    <>
      <CreateTodo onAdd={refreshTodoList} userToken={userToken}/>
      <button onClick={removeTokenAndLogOut}>Log out</button>
      <Filter filter={filter} setFilter={setFilter} />
      <Search searchText={searchText} setSearchText={setSearchText} />
      <TodoList
        todoList={todoList}
        sort={sort}
        setSort={setSort}
        onRemove={refreshTodoList}
        onChange={refreshTodoList}
      />

      <button onClick={() => changePage(1)}>first</button>
      <button onClick={() => changePage(currentPage - 1)}>prev</button>
      {pagesToRender.map((it) => (
        <button
          style={it === currentPage ? { color: "green" } : {}}
          onClick={() => changePage(it)}
        >
          {it}
        </button>
      ))}
      <button onClick={() => changePage(currentPage + 1)}>next</button>
      <button onClick={() => changePage(maxPage)}>last</button>
      
    </>
  );
};

export default TodoManager;
