const {
  addBooksHandler,
  getAllbooksHandler,
  editNoteByIdHandler,
  getNoteByIdHandler,
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
    path: '/books/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
