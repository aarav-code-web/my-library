// ================================
// 1️⃣ DATA STORE
// ================================
const myLibrary = [];


// ================================
// 2️⃣ BOOK CONSTRUCTOR
// ================================
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};


// ================================
// 3️⃣ ADD BOOK TO LIBRARY
// ================================
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  renderLibrary();
}


// ================================
// 4️⃣ RENDER LIBRARY (UI ONLY)
// ================================
function renderLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("book-card");

    const title = document.createElement("p");
    title.textContent = `Title: ${book.title}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement("p");
    status.textContent = book.read ? "Read" : "Not Read";
    status.classList.add(book.read ? "read" : "not-read");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle Read";
    toggleBtn.addEventListener("click", () => {
      book.toggleRead();
      renderLibrary();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      renderLibrary();
    });

    card.append(title, author, pages, status, toggleBtn, removeBtn);
    libraryDiv.appendChild(card);
  });
}


// ================================
// 5️⃣ FORM + INPUT HANDLING
// ================================
const newBookBtn = document.getElementById("newBookBtn");
const form = document.getElementById("bookForm");

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

newBookBtn.addEventListener("click", () => {
  form.hidden = false;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    readInput.checked
  );

  form.reset();
  form.hidden = true;
});


// ================================
// 6️⃣ TEST DATA (PROVES IT WORKS)
// ================================
addBookToLibrary("1984", "George Orwell", 328, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
