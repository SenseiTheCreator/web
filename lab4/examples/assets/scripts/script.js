function markAsRead() {
  this.isRead = true;
  console.log(`Книга "${this.title}" відмічена як прочитана.`);
}
let book = {
  title: "Harry Potter and the Sorcerer's Stone",
  author: "J.K. Rowling",
  year: 1997,
  isRead: true,
  bookInfo() {
    console.log(`Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`);
  }
}

book.bookInfo()

book.isRead = !book.isRead;
book.bookInfo();

let library = [
  { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997, isRead: true, markAsRead },
  { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, isRead: false, markAsRead },
  { title: "1984", author: "George Orwell", year: 1949, isRead: true, markAsRead },
];

function displayLibrary() {
  library.forEach(book => {
    console.log(`Назва: ${book.title}, Автор: ${book.author}, Рік видання: ${book.year}, Прочитана: ${book.isRead ? "Так" : "Ні"}`);
  });
}

library.push({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isRead: false, markAsRead });
displayLibrary();

library.sort((a, b) => a.year - b.year);
console.log("Бібліотека після сортування за роком видання:", library);

let unreadBooks = library.filter(book => !book.isRead);
console.log("Непрочитані книги:", unreadBooks);

let tolkienBook = library.find(book => book.author === "J.R.R. Tolkien");
console.log("Книга Толкіна:", tolkienBook);

function addBookToLibrary() {
  let title = prompt("Введіть назву книги:");
  let author = prompt("Введіть автора книги:");
  let year = +prompt("Введіть рік видання книги:");
  let isRead = confirm("Чи прочитана книга?");
  library.push({ title, author, year, isRead, markAsRead });
  displayLibrary();
}

addBookToLibrary();

library.find(book => book.title === "The Hobbit").markAsRead(); // task 1
displayLibrary();

function calculateAverageYear() { // task 2
  let totalYears = 0;
    library.forEach(book => {
        totalYears += book.year;
    });
  return totalYears / library.length;
}
console.log(`Середній рік видання книг у бібліотеці: ${calculateAverageYear()}`);