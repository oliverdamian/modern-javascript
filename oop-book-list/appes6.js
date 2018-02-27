class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Store {
  static getBooks() {
    let books;

    if(localStorage.getItem('books') === null) {
      books = [];
    }
    else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI();

      ui.addBookToList(book);
    });

  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td>
        <i class="far fa-trash-alt delete-icon"></i>
      </td>
    `;

    list.appendChild(row);
  }

  deleteBook(target) {
    if(target.classList.contains('delete-icon')) {
      target.parentElement.parentElement.remove();
    }
  }

  clearInputs() {
    const inputs = document.querySelectorAll('input:not(.submit-btn)');

    inputs.forEach(function(input) {
      input.value = '';
      input.className += ' clear-input';
    });
  }

  showAlert(message, type) {
    const div = document.createElement('div');
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    div.className = `alert ${type}`;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 3000);
  }
}

// On document load
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Adding a book
document.getElementById('book-form').addEventListener('submit', function(e) {
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);
  const ui = new UI();

  if(title === '' || author === '' || isbn === '') {
    ui.showAlert('Please fill in all fields', 'error');
  }
  else {
    ui.addBookToList(book);
    Store.addBook(book);

    ui.showAlert('Book added', 'success');
    ui.clearInputs();
  }

  e.preventDefault();
});

// Deleting a book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  ui.showAlert('Book deleted', 'success');

  e.preventDefault();
});