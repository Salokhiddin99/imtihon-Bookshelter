const elSearch = document.querySelector('.search-input');
const elResult = document.querySelector('.result');
const elShowing = document.querySelector('.showing');
const elNewst = document.querySelector('.newest');
const elCards = document.querySelector('.cards');
const elBookmarkBtn = document.querySelector('.bookmark-btn')
const elBookmark = document.querySelector('.bookmarks-list');
const bookmarkTemplate = document.querySelector('.bookmark-template').content;
const cardTemplate = document.querySelector('.card-template').content;

let search = "python";
let maxResult = "10";
let page = 1;

const renderBooks = function (arr, htmlElement) {
    const booksFragment = document.createDocumentFragment();

    elCards.innerHTML = null;

    arr.forEach((book) => {
        let copyTemplate = cardTemplate.cloneNode(true);

        copyTemplate.querySelector(".book__img").src = book.volumeInfo.imageLinks.smallThumbnail;
        copyTemplate.querySelector(".book__title").textContent = book.volumeInfo.title;
        copyTemplate.querySelector(".book__avtor").textContent = book.volumeInfo.authors;
        copyTemplate.querySelector(".book__year").textContent = book.volumeInfo.publishedDate;

        copyTemplate.querySelector('.reading-btn').href = book.volumeInfo.previewLink;

        booksFragment.appendChild(copyTemplate);

    });

    htmlElement.appendChild(booksFragment);
};

const getBooks = async function () {
    let request = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=${maxResult}&startIndex=${page}`);

    const books = await request.json();
    if (books.items && books.items.length > 0) {
        renderBooks(books.items, elCards);
    }
};
getBooks();

elSearch.addEventListener("input", function () {
    search = elSearch.value;
    getBooks();
});

