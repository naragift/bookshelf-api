const {
    addHandler,
    getsHandler,
    eByIdHandler,
    ByIdHandler,
    delByIdHandler,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path:s',
      handler: Handler,
    },
    {
      method: 'GET',
      path:s',
      handler: getsHandler,
    },
    {
      method: 'GET',
      path:s/{id}',
      handler: ByIdHandler,
    },
    {
      method: 'PUT',
      path:s/{id}',
      handler: eByIdHandler,
    },
    {
      method: 'DELETE',
      path:s/{id}',
      handler: delByIdHandler,
    },
  ];
  
  module.exports = routes;
  