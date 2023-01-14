const { nanoid } = require("nanoid");
const books = require("./books");

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    number,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    name,
    year,
    number,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((books) => books.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        booksId: id,
      },
    });
    response.code(201);
    return response;
  }
  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
   const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);

  return response;
};

const getAllBooksHandler = (request, h) => {
  if (books.length === 0) {
    return h
      .response({
        status: "success",
        data: {
          books: [],
        },
      })
      .code(200);
  }
  const filteredBooks = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks,
    },
  });
  response.code(200);
  return response;
};

const getBooksByIdHandler = (request, h) => {
    const { id } = request.params;
    const book = books.filter((n) => n.id === id)[0];

    const filteredBooks = books.map((book) => ({
        id: book.id,
        name: book.name,
        year: book.year,
        author: book.author,
        summary: book.summary,
        publisher: book.publisher,
        pageCount: book.pageCount,
        readPage: book.readPage,
        finished: book.finished,
        reading: book.reading,
        insertedAt: book.insertedAt,
        updatedAt: book.updatedAt,
      }));

  if (book !== undefined) {
    return h
    .response({
      status: "success",
      data: {
        book : filteredBooks
      },
    })
    .code(200);

  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};


const editBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const { const {
    name,
    year,
    number,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload; } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((note) => note.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }
  if (!name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }
  if (readPage > pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }
  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((note) => note.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteNoteByIdHandler,
};