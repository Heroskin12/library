// Book Class
class Book {
    constructor(name, author, year, pages, read) {
        this.name = name;
        this.author = author;
        this.year = year;
        this.pages = pages;
        this.read = read;
    }
}

// Buttons & Form
const addMenu = document.querySelector('#addMenu');
const submitBook = document.querySelector('#submitBook');
const bookForm = document.querySelector('#bookForm');

//Form Inputs
const bookName = document.querySelector('#name');
const bookAuthor = document.querySelector('#author');
const bookYear = document.querySelector('#year');
const bookPages = document.querySelector('#pages');
const bookRead = document.querySelector('#read');

//Card Section Parent Node
const parent = document.querySelector('#cards');

// Initialise new array.
let myLibrary = [];

// Show 'Add Book' form when user clicks 'Add Book' button.
addMenu.addEventListener('click', () => {
    addMenu.classList.add('hide');
    bookForm.classList.remove('hide');
});

// When the form is submitted...
submitBook.addEventListener('click', () => {
    addMenu.classList.remove('hide'); // hide form
    bookForm.classList.add('hide'); // show add book button again.
    addBookToLibrary();
    displayBooks();
});

// Remove Button
function removeBook() {
    const removeButton = document.querySelectorAll('.remove');
    for (const button of removeButton) {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-type'));
            myLibrary.splice(index, 1);
            displayBooks();
        })
}
}

// Function to Change Read Status
function changeStatus() {
    const readButton = document.querySelectorAll('.change');
    for (const i of readButton) {
        i.addEventListener('click', () => {
            const index = parseInt(i.getAttribute('data-type'));
            console.log(index);
            const buttonToChange = myLibrary[index];
            console.log(buttonToChange)

            if (buttonToChange.read === "read") {
                buttonToChange.read = "not read";
            }
            else {
                buttonToChange.read = "read";
            }
            console.log(buttonToChange)
            displayBooks();
        })
    }
}

// Add a prototype function to log successful form inputs.
//Book.prototype.reportInfo = function() {
    //return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
//}

// Add book to array...
function addBookToLibrary() {
        // Form inputs defined in global scope...
        const name = bookName.value;
        const author = bookAuthor.value;
        const year = bookYear.value;
        const pages = bookPages.value;
        if (bookRead.checked) {
            bookRead.value = "read";
        }
        else {
            bookRead.value = "not read"
        } 
        const read = bookRead.value;
        let book = new Book(name, author, year, pages, read); // New book object added to array...
        myLibrary.push(book);
}


// For loop to add each new book to cards.
function displayBooks() {
    parent.innerHTML = "";
    let index = 0;
    myLibrary.forEach( myLibrary => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-type', index);
        parent.appendChild(card);
        for (let key in myLibrary) {
            if (key === "name") {
                const h3 = document.createElement('h3');
                h3.textContent = `${myLibrary[key]}`;
                card.appendChild(h3);
            }
            else {
                const para = document.createElement('p');
                para.textContent = `${key}: ${myLibrary[key]}`;
                card.appendChild(para);
            }
        }

        // Remove Button 
        const button = document.createElement('button');
        button.type = "button";
        button.classList.add('remove');
        button.setAttribute('data-type', index);        
        button.textContent = "Remove";
        card.appendChild(button);

        // Change Read Status Button
        const readButton = document.createElement('button');
        readButton.type="button";
        readButton.classList.add('change');
        readButton.setAttribute('data-type', index);
        readButton.textContent = "Change read status."
        index++;
        card.appendChild(readButton);
    })
    removeBook();
    changeStatus();
}
