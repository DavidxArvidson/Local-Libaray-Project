function findAccountById(accounts, id) {
  let specAccount = accounts.filter((account) => account.id === id);
  let result = specAccount[0];
  return result;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase()) ? -1 : 1);
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let result = 0;
  for (let title in books) {
    let book = books[title];
    let borrows = book.borrows;
    for (let i = 0; i < borrows.length; i++) {
      if (borrows[i].id === accountId) {
        result += 1
      }
    }
  }
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksPossessed = [];
  books.forEach(book => {
    let borrowArray = book.borrows;
    if (borrowArray.find(borrow => borrow.id === account.id && borrow.returned === false)) {
      booksPossessed.push(book);
    }
  })
  booksPossessed.forEach(book=>{
    let author = authors.find(person => person.id === book.authorId);
    book['author'] = author;
  })
  return booksPossessed;
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
