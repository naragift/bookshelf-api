const {
    addbookHandler,
    getAllbooksHandler,
    editbookByIdHandler,
    getbookByIdHandler,
    deletebookByIdHandler,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addbookHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: getAllbooksHandler,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getbookByIdHandler,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: editbookByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deletebookByIdHandler,
    },
  ];
  
  module.exports = routes;
  