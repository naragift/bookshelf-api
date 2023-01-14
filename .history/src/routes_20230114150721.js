const {
  addBooksHandler,
  getAllBooksHandler,
  editNoteByIdHandler,
  getBooksByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
