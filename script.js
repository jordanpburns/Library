function Book(title, author, numPages, read) {
    let id = "id" + Math.random().toString(16).slice(2);
    this.id = id;
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read === "true" ? true : false;
    this.displayed = false;
    this.info = function() {
        infoString = `${this.title} by ${this.author}, ${numPages} pages, `;
        if (this.read) {
            infoString += "already read";
        } else {
            infoString += "not read yet";
        }
        return infoString;
    }
}

function createCard(book) {
    // create a card for the given book

    const titleDiv = document.createElement("div");
    titleDiv.textContent = book.title;
    titleDiv.classList.add("title-div");

    const authorDiv = document.createElement("div");
    authorDiv.textContent = book.author;
    authorDiv.classList.add("author-div");

    const numPagesDiv = document.createElement("div");
    numPagesDiv.textContent = `Number of Pages: ${book.numPages}`;
    numPagesDiv.classList.add("num-pages-div");

    const readDiv = document.createElement("div");
    readDiv.textContent = book.read ? "Already read" : "Not read yet";
    readDiv.classList.add("read-div");

    const deleteCardButton = document.createElement("button");
    deleteCardButton.textContent = "Delete book";
    deleteCardButton.classList.add("delete-button");
    deleteCardButton.addEventListener("click", deleteBook);

    const toggleReadButton = document.createElement("button");
    toggleReadButton.classList.add("toggle-read-button");
    toggleReadButton.textContent = book.read ? "Set as Unread" : "Set as Read";
    toggleReadButton.addEventListener("click", toggleRead);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "grid-container");
    if (!book.read) {
        cardDiv.classList.add("unread");
    }

    cardDiv.append(
        titleDiv,
        authorDiv,
        numPagesDiv,
        readDiv,
        deleteCardButton,
        toggleReadButton
    );

    cardDiv.id = book.id;
    return cardDiv;
 }

function addBookToLibrary(book, library) {
    // pushes book to the library array
    library.push(book);
  }

function displayBooks(myLibrary) {
    // create card object with each book
    const content = document.getElementById("content");
    for (const book of myLibrary) {
        if (book.displayed === false) {
            const card = createCard(book);
            content.appendChild(card);
            book.displayed = true;
        }
    }
}

function deleteBook(event) {
    //find card clicked on
    const card = event.target.parentNode;
    // get matching book by id
    let bookToDelete = null;
    for (const book of myLibrary) {
        if (book.id === card.id) {
            bookToDelete = book;
            break;
        }
    }
    //delete book from myLibrary, and delete card --from stack exchange
    const index = myLibrary.indexOf(bookToDelete);
        if (index > -1) { // only splice array when item is found
            myLibrary.splice(index, 1); // 2nd parameter means remove one item only
            card.remove();
    }
}

function toggleRead(event) {
    const card = event.target.parentNode;
    //get this card's book
    let bookToChange = null;
    for (const book of myLibrary) {
        if (book.id === card.id) {
            bookToChange = book;
            break;
        }
    }

    if (bookToChange.read) {
        bookToChange.read = false;
    }
    else {
        bookToChange.read = true;
    }
    newCard = createCard(bookToChange);
    newCard.id = bookToChange.id;
    event.target.parentNode.replaceWith(newCard);
}

const myLibrary = [];

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", 
    (event) => {
        const title = document.getElementById("title");
        const author = document.getElementById("author");
        const numPages = document.getElementById("numPages");
        const read = document.getElementById("read");

        const book = new Book(title.value, 
            author.value,
            numPages.value,
            read.value    
        )
        addBookToLibrary(book, myLibrary);
        displayBooks(myLibrary);

        // reset form values
        for (element of [title, author, numPages]) {
            element.value = "";
        }
        read.value = "false";
    }
)

openForm = document.getElementById("add-a-book-button");
openForm.addEventListener("click", 
    (event) => {
        mainContainer = document.getElementById("main-container");
        mainContainer.classList.remove("form-closed");
        mainContainer.classList.add("form-open");
        document.getElementById("form-container").style.display = "flex";
    }
)

closeForm = document.getElementById("close-form");
closeForm.addEventListener("click", 
    (event) => {
        mainContainer = document.getElementById("main-container");
        document.getElementById("form-container").style.display = "none";
        mainContainer.classList.remove("form-open");
        mainContainer.classList.add("form-closed");
    }
)

document.getElementById("search-bar").addEventListener("keyup",
    (event) => {
        const searchText = document.getElementById("search-bar").value;
        const cards = document.getElementById("content").childNodes;
        // get title and author
        for (card of cards) {
            let authorText = null;
            let titleText = null;
            for (child of card.childNodes) {
                if (child.className == "author-div") {
                    authorText = child.textContent;
                }
                if (child.className == "title-div") {
                    titleText = child.textContent;
                }
            }
            // if searchText not in either author or title then hide card
            if (!authorText.includes(searchText) && !titleText.includes(searchText)) {
                card.style.display = "none";
            } else {
                card.style.display = "grid";
            }
        }

    }
)

 const book = new Book("The Book Title", "The Author", 157, true);
 addBookToLibrary(book, myLibrary);
 displayBooks(myLibrary);