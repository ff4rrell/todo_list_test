class Pathes {
  static todo =
    (
      filter = '',
      searchText = '',
      sort = {field: 'todoId', dir: 'asc'},
      currentPage = 1,
      limit = 10,
      token = null
    ) =>
      `/todo?filter=${filter}&searchText=${searchText}&sortField=${sort.field}&sortDir=${sort.dir}&page=${currentPage}&limit=${limit}&token=${token}`
  static todoId = todoId => `/todo/${todoId}`
}

export default Pathes
