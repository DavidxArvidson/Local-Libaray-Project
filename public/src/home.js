function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === false) {
      count += 1;
    }
  }
  return count;
}

function convertHolderObject(object) {
  let result = [];
  for (let key in object) {
    let xObject = {}
    const count = object[key];
    xObject["name"] = key;
    xObject["count"] = count;
    result.push(xObject);
  }
  return result;
}


function getMostCommonGenres(books) { 
  let holderObj = {};
  books.forEach(book => {
    if (holderObj[book.genre]) {
      holderObj[book.genre]++;
    } else {
      holderObj[book.genre] = 1;
    }
  });

  let countArray = convertHolderObject(holderObj);
  countArray.sort((objectA, objectB) => objectB.count - objectA.count);
  return countArray.slice(0, 5);
}

function getMostPopularBooks(books) {
  let holderObject = {};
  books.forEach((book) => {
    holderObject[book.title] = book.borrows.length;
  })
  const countArray = convertHolderObject(holderObject);
  countArray.sort((bookA, bookB) => bookB.count - bookA.count);
  return countArray.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorList = books.reduce((acc, book) => { 
    const { authorId, borrows } = book;
    const authorObj = authors.find(author => author.id === authorId);
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    const count = borrows.length;
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      authExists.count += count;
    } else {
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    return acc;
  }, []);
  const sortedAuthorList = authorList.sort((authorA, authorB) => authorB.count - authorA.count);
  const topFive = sortedAuthorList.slice(0, 5);
  return topFive;
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
