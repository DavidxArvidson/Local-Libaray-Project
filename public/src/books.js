function findAuthorById(authors, id) {
  const authorIds = authors.map((author) => author.id);
  let getAuthorIndex = (array) => {
    for (let i = 0; i < authorIds.length; i++) {
      if (authorIds[i] === id) {
        return i;
      }
    }
  }
  let index = getAuthorIndex(authorIds);
  return authors[index];
}

function findBookById(books, id) {
  for (let title in books) {
    const book = books[title];
    const bookId = book.id;
    if (bookId === id) {
      return book;
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let inStock = [];
  books.forEach((book) => {
    (book.borrows[0].returned === false) ? checkedOut.push(book) : inStock.push(book);
  })
  let result = [checkedOut,inStock];
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  for (let account in accounts) {
    let person = accounts[account];
    let accountId = person.id;
    for (let i = 0; i < book.borrows.length; i++) {
      if (book.borrows[i].id === accountId && result.length < 10) {
        person["returned"] = book.borrows[i].returned;
        result.push(person);
      }
    }
  }
  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
