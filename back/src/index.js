const express = require("express");
const cors = require("cors");
const app = express();
const TodoManager = require("./todo-manager");
const stubber = require("./todo-stub");
const UserManager = require("./user-manager");

const todoManager = new TodoManager();
const userManager = new UserManager();
stubber(todoManager);
// console.log(todoManager);
// console.log(stubber(todoManager), "stubber");

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

//crud
// createTodoWithUserId


app.get("/todo", function (req, res, next) {
  const filter = req.query.filter;
  const searchText = req.query.searchText;
  const sortField = req.query.sortField;
  const sortDir = req.query.sortDir;
  const page = req.query.page;
  const limit = req.query.limit;
  
  const userToken = req.query.userToken;
  const user = userManager.findByToken(userToken);
  console.log(userToken, "get, get")

  res.json(
    todoManager.getByFilterAndSearchTextAndSort(
      user.userId,
      filter,
      searchText,
      sortField,
      sortDir,
      page,
      limit
    )
  );
});


app.put("/todo", function (req, res) {
  const titleForNewTodo = req.body.title;
  const userToken = req.query.userToken;

  console.log(userToken ,"userToken, put")
  const user = userManager.findByToken(userToken)
  const newTodo = todoManager.createTodoWithUserId(titleForNewTodo, user);
  todoManager.addIfNotPresentedByTitle(newTodo);
  
  // console.log(todoManager, "todoManager")
  res.json(newTodo);
});

app.get("/todo/:todoId", function (req, res, next) {
  const todoId = Number(req.params.todoId);
  res.json(todoManager.getById(todoId));
});

app.post("/todo/:todoId", function (req, res, next) {
  const todoId = Number(req.params.todoId);
  const token = req.body.token;
  const changeSet = req.body;
  const user = userManager.findByToken(token);
  // console.log(token, "token, post");
  // console.log(user, "user, post")
  todoManager.changeTodo(todoId, changeSet);
  res.json(todoManager.getById(todoId));
});

app.delete("/todo/:todoId", function (req, res, next) {
  const todoId = Number(req.params.todoId);
  todoManager.remove(todoId);
  
  res.json({ todoId });
});


app.put("/signup", function (req, res) {
  const userInfo = req.body;
  const newUser = userManager.createUser(userInfo.name, userInfo.password);
  userManager.addIfNotPresentedByName(newUser);
  
  res.json(userManager);
});

app.post("/login", function (req, res) {
    const userInfo = req.body;
    const user = userManager.setTokenForUser(userInfo.name, userInfo.password);
    // console.log(user, "user, post")
    
    res.json({ token: user.token })
});

app.get("/userList", function(req, res){
  res.json(userManager)
})
app.post("/logout", function(req, res) {
  const tokenFromUser = req.body;
  // console.log(tokenFromUser, "token")
  userManager.deleteTokenFromUser(tokenFromUser.token);
  res.json('ok')
})

app.listen(4000, function () {
  console.log("CORS-enabled web server listening on port 80");
});
