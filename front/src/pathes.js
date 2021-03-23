class Pathes {
  static todo =
    (
      filter = '',
      searchText = '',
      sort = {field: 'todoId', dir: 'asc'},
      currentPage = 1,
      limit = 10
    ) =>
      `/todo?filter=${filter}&searchText=${searchText}&sortField=${sort.field}&sortDir=${sort.dir}&page=${currentPage}&limit=${limit}`
  static todoId = todoId => `/todo/${todoId}`
}

export default Pathes
