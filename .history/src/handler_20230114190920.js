/* eslint-disable no-undef */
const { nanoid } = require("nanoid");
const books = require("./books");

const addBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;
  const { year, author, summary, publisher, pageCount, readPage } =
    request.payload;

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

  const id = nanoid(16);
  // eslint-disable-next-line no-const-assign
  finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;


  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => books.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        booksId: books.id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
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
          book: filteredBooks,
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
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((books) => books.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      number,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
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

const deleteBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((books) => books.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// eslint-disable-next-line no-undef
module.exports = {
  addBooksHandler,
  getAllBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
};
