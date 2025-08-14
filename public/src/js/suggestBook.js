import { googleBooksSearch } from './api.js';
import { suggestBookToClub } from './club.js';

const searchForm = document.getElementById('searchBookForm');
const resultsContainer = document.getElementById('searchResults');

function renderSearchResults(books, clubId) {
  resultsContainer.innerHTML = '';

  if (books.length === 0) {
    resultsContainer.innerHTML = '<p>No books found.</p>';
    return;
  }

  books.forEach((book) => {
    const div = document.createElement('div');
    div.classList.add('book-result');

    div.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}" />
      <h4>${book.title}</h4>
      <p>${book.authors.join(', ')}</p>
      <p>${book.description.slice(0, 100)}...</p>
      <button class="suggest-btn">Suggest to Club</button>
    `;

    const button = div.querySelector('.suggest-btn');
    button.addEventListener('click', () => {
      const success = suggestBookToClub(clubId, book);
      if (success) {
        alert(`Book "${book.title}" suggested to the club!`);
      } else {
        alert('Failed to suggest book.');
      }
    });

    resultsContainer.appendChild(div);
  });
}

if (searchForm) {
  searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = searchForm.querySelector('input[type="text"]').value.trim();
    if (!query) return;

    const clubId = searchForm.dataset.clubId;
    const books = await googleBooksSearch(query, 10);
    renderSearchResults(books, clubId);
  });
}
