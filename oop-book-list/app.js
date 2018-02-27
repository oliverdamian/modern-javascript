function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

function UI() {}

UI.prototype.addBookToList = function(book) {
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
};

UI.prototype.deleteBook = function(target) {
  if(target.classList.contains('delete-icon')) {
    target.parentElement.parentElement.remove();
  }
};

UI.prototype.clearInputs = function() {
  const inputs = document.querySelectorAll('input:not(.submit-btn)');

  inputs.forEach(function(input) {
    input.value = '';
    input.className += ' clear-input';
  });
};

UI.prototype.showAlert = function(message, type) {
  const div = document.createElement('div');
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  div.className = `alert ${type}`;
  div.appendChild(document.createTextNode(message));
  container.insertBefore(div, form);

  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
};

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
    ui.showAlert('Book added', 'success');
    ui.clearInputs();
  }

  e.preventDefault();
});

// Deleting a book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();

  ui.deleteBook(e.target);
  ui.showAlert('Book deleted', 'success');

  e.preventDefault();
});