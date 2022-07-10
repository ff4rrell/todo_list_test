import "./App.css";
import { useEffect, useState } from "react";
import requester from "./utils/requester";
import Pathes from "./pathes";
import { Filters } from "./constants";
import CreateUser from "./components/CreateUser";
import TodoManager from "./components/TodoManager";

const PAGE_LIMIT = 5;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [filter, setFilter] = useState(Filters.ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [todoTotal, setTodoTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState({ field: "todoId", dir: "asc" });
  const [userToken, setUseToken] = useState({
    token: null
  });
  
  const [user, setUser] = useState({
    name: "",
    password: "",
  });

  const [userLogin, setUserLogin] = useState({
    name: "",
    password: "",
  });

  const refreshTodoList = async () => {
    const { list, total } = await requester.get(
      Pathes.todo( userToken.token, filter, searchText, sort, currentPage, PAGE_LIMIT)
      
    );
    console.log(Pathes.todo( userToken.token, filter, searchText, sort, currentPage, PAGE_LIMIT))
    setTodoList(list);
    setTodoTotal(total);
  };

  useEffect(() => {
    refreshTodoList();
  }, [filter, searchText, sort, currentPage,userToken]);

  const maxPage = Math.ceil(todoTotal / PAGE_LIMIT);
  const pages = [];
  for (let i = 1; i <= maxPage; i++) {
    pages.push(i);
  }
  const changePage = (page) => {
    if (!(page < 1 || page > maxPage)) {
      setCurrentPage(page);
    }
  };

  const left = currentPage < 3 ? 0 : currentPage - 3;
  const right = currentPage + 2 > maxPage ? maxPage : currentPage + 2;
  const pagesToRender = pages.length < 6 ? pages : pages.slice(left, right);
  
  const getLoginUser = async () => {
    const tokenFromServer = await requester.post("/login", {
      name: userLogin.name,
      password: userLogin.password
    })
    console.log(userToken, 'userToken')
    
    setUseToken({
      token: tokenFromServer.token
    })

    setUserLogin({
      name: '',
      password: ''
    })
  };

  const removeTokenAndLogOut = async () => {
    await requester.post("/logout", userToken);

    setUseToken({
      token: null
    })

  }
  return (
    <div className="App">
    
      <button onClick={()=> {console.log(userToken)}}>TOYOTA</button>
      
      {userToken.token ? (
        <TodoManager
          refreshTodoList={refreshTodoList}
          filter={filter}
          setFilter={setFilter}
          searchText={searchText}
          todoList={todoList}
          sort={sort}
          setSort={setSort}
          changePage={changePage}
          currentPage={currentPage}
          maxPage={maxPage}
          pagesToRender={pagesToRender}
          onAdd={refreshTodoList}
          removeTokenAndLogOut={removeTokenAndLogOut}
          setSearchText={setSearchText}
          userToken={userToken}
        />
      ) : (
        <CreateUser
          user={user}
          setUser={setUser}
          onAdd={refreshTodoList}
          userLogin={userLogin}
          setUserLogin={setUserLogin}
          loginUser={getLoginUser}
        />
      )}
    </div>
  );
}

export default App;
